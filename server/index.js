const {PORT, DATABASE_URI, SESSION_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('../.config');
const express = require('express');
const cors = require('cors');
const {json} = require('body-parser');
const session = require('express-session');
const Sequelize = require('sequelize')
    , db = require('./config/db.js');
const google = require('googleapis')
    , OAuth2 = google.auth.OAuth2
    , {google_auth_url, oauth2Client} = require('./googleAuth'); 
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , GoogleStrategy = require('passport-google-oauth20').Strategy;
const socket = require('./socket-server/index');
// CONTROLLERS
const slides = require('./controllers/slides_controller');
// DATABASE
const sequelize = new Sequelize(DATABASE_URI, {
  dialectOptions: {
    ssl: true
  }
});

const activeRooms = [];


sequelize
.authenticate()
.then(() => {
  console.log('Database connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
//////////////////////////////////////////////////////////////////
// App Setup
const app = express();
app.use( express.static( `${__dirname}/../build` ) );
app.use(cors());
app.use(json());
app.use(session({ // Must be used before passport.session()
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 600000 }
}));
app.use(passport.initialize());
app.use(passport.session());
//////////////////////////////////////////////////////////////////
// PERSISTENCE
passport.serializeUser(function(user, done) {
  console.log('SERIALIZE USER: ', user.id + ': ' + user.username)
  return done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  db.users.findOne({where: {id: id}}).then((user) => {
    console.log('DESERIALIZE USER', user)
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  }).catch(err => done(err));
})
  // PASSPORT STRATEGIES
passport.use('local', new LocalStrategy(
function(username, password, done){
  db.users.findOrCreate({where: {username: username}}).spread((user, created) => {
    if (!created && user.password && password != user.password){
      console.log('Username or Password is incorrect');
      return done(null, false, {message: 'Incorrect Username or Password'})
    }
    if (created){ 
      db.users.update({password: password}, {where: {id: user.id}})
        .then(result => {if (result[0] === 1) console.log('CREATED PASSWORD FOR USER: ', user.id)})
        .catch(console.log);
      console.log('CREATED PASSWORD FOR USER: ', user.id);
    }
    console.log('LOCAL USER: ', user.id);
    console.log('CREATED: ' + created);
    return done(null, user);
  }).catch((err) => done(err));
}))
passport.use('google', new GoogleStrategy({ 
  clientID: GOOGLE_CLIENT_ID, 
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://162.243.186.115.xip.io:3001/google/auth/logincallback'
},  
function(accessToken, refreshToken, profile, done){
  db.users.findOrCreate({where: {username: 'google|' + profile.id}}).spread((user, created) => {
    console.log('GOOGLE USER: ', user.dataValues.id)
    console.log('GOOGLE CREATED: ', created)
    return done(null, user);
  }).catch((err) => done(err));
}))
//////////////////////////////////////////////////////////////////
// GOOGLE AUTH ENDPOINTS
// app.get('/api/presentation/getpresentation/:id', isAuthed(google_auth_url));
app.get('/api/presentation/getpresentation/:id', function(req, res, next){
  // console.log('TEEEEST:', req);
  req.session.user = req.user.id;
  req.session.presentation_id = req.params.id;
  res.redirect(google_auth_url);
  return;
});
  
app.get('/api/presentation/:id', ( req, res, next ) => {console.log("GET MIDDLEWARE", req.session);next()},
                                  slides.getPresentation,
                                  slides.storePresentation,
                                  slides.getSlideImage, 
                                  slides.storeSlides)
// app.get('/api/presentation/getslide/', slides.getSlideImage);
app.get("/oauth2callback", function(req, res) {
  const code = req.query.code
  oauth2Client.getToken(code, function(err, tokens) {
    if (!err) {
      oauth2Client.setCredentials(tokens);
      req.session.tokens = tokens;
      res.redirect(`/api/presentation/${req.session.presentation_id}`);
      return;
    } else {
      res.status(500).send(err)
    }
  })
})

//////////////////////////////////////////////////////////////////
// LOGIN ENDPOINTS
app.get('/google/auth/login', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                                                        'https://www.googleapis.com/auth/presentations.readonly']}))
app.get('/google/auth/logincallback', passport.authenticate('google', { 
  // successRedirect: `http://localhost:3000/home/${user.id}`,
  failureRedirect: 'http://localhost:3000/login',
  failureFlash: true}), (req, res, next) => {res.redirect(`http://162.243.186.115.xip.io:3001/home/${req.user.id}`);return;})

app.get('/login')
app.post( '/login', passport.authenticate( ['local'], { failureRedirect: '/login',
                                                        failureFlash: true } ),
                    (req, res, next) => {console.log(req.user);res.redirect('/login'); next();});
app.get('/signup', )
app.post('/signup', )
//////////////////////////////////////////////////////////////////
// DATABASE ENPOINTS
app.post('/user', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.users.create({ username, password }).then(newUser => {
    // if(!req.session.cookie.user){
    //   req.session.cookie.user = {id: newUser.dataValues.id,
    //                       username: newUser.dataValues.username};
    // }
    // console.log(req.session)
    res.send(newUser)}).catch(console.log);
})

app.post('/presentation', (req, res) => {
    owner_id = req.body.owner_id;
    id_string = req.body.id_string;
  db.presentations.create({
    owner_id,
    id_string
  }).then(newPresentation => res.send(newPresentation))
    .catch(console.log);
})

app.get('/user_presentations/:id', (req, res) => {
  owner_id = req.params.id;
  db.presentations.findAll({ where: { owner_id: owner_id,
                                      id_string: {$ne: null} }
  }).then(data => res.send(data))
    .catch(console.log);

})

app.get('/slides/:parent_id', (req, res) => {
  const parent_id = req.params.parent_id;
  db.slides.findAll({where: {parent_id}})
    .then(data => res.send(data))
    .catch(console.log);
})

app.post('/slide', (req, res) => {
  const slide_number = req.body.slide_number;
  const url = req.body.url;
  const parent_presentation = req.body.parent_presentation;
  const parent_id = req.body.parent_id;
  db.slides.create({
    slide_number,
    url,
    parent_presentation,
    parent_id
  }).then(newSlide => res.send(newSlide)).catch(console.log);
})
app.get('/slide/:presentation/:id', (req, res) => {
  const presentationID = req.params.presentation;
  const slideNumber = req.params.id;
  db.slides.findOne({
    where: { parent_id: presentationID,
             slide_number: slideNumber }
  }).then(slide => res.send(slide)).catch(console.log);
})

//////////////////////////////////////////////////////////////////
// CLASSROOM ENDPOINTS
app.get('/openClassroom/:id', (req, res) => {
  activeRooms.push({
    id: req.params.id,
    password: req.body.password,
    owner: req.user.id});
  console.log(activeRooms);
})

app.get('/closeClassroom/:id', (req, res) => {
  const roomIndex = activeRooms.findIndex((room) => {
    return room.id === req.params.id
  })
  const room = activeRooms[roomIndex];
  if (room.owner === req.user.id) activeRooms.splice(roomIndex, 1);
})

//////////////////////////////////////////////////////////////////
// WEBSERVER INIT
const server = app.listen(PORT, () => console.log(`Listening for socket connections on port ${PORT}`));

// SOCKET INIT
const io = socket(server);

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})