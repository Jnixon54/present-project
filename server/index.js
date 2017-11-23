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
app.use(cors());
app.use(json());
app.use(session({ // Must be used before passport.session()
  secret: SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 10000}
}));
app.use(passport.initialize());
app.use(passport.session());
//////////////////////////////////////////////////////////////////
// PERSISTENCE
passport.serializeUser(function(id, done) {
  console.log('SERIALIZE USER: ', id)
  done(null, id);
});
passport.deserializeUser((id, done) => {
  db.users.findOne({where: {id: id}}).then((user) => {
    console.log('DESERIALIZE USER', user)
    done(null, user);
  }).catch(console.log);
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
        .then(result => {if(result[0] === 1)console.log('CREATED PASSWORD FOR USER: ', user.id)})
        .catch(console.log);
      console.log('CREATED PASSWORD FOR USER: ', user.id);
    }
    console.log('LOCAL USER: ', user.id);
    console.log('CREATED: ' + created);
    return done(null, user.id);
  }).catch((err) => done(err));
}))
passport.use('google', new GoogleStrategy({ 
  clientID: GOOGLE_CLIENT_ID, 
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/google/auth/logincallback'
},  
function(accessToken, refreshToken, profile, done){
  db.users.findOrCreate({where: {username: 'google|' + profile.id}}).spread((user, created) => {
    console.log('GOOGLE USER: ', user.dataValues.id)
    console.log('GOOGLE CREATED: ', created)
    return done(null, user.dataValues.id);
  }).catch((err) => done(err));
}
))
//////////////////////////////////////////////////////////////////
// GOOGLE AUTH ENDPOINTS
// app.get('/api/presentation/getpresentation/:id', isAuthed(google_auth_url));
app.get('/api/presentation/getpresentation/:id', function(req, res, next){
  req.session.user = req.session.passport.user;
  req.session.presentation_id = req.params.id;
  res.redirect(google_auth_url)});
app.get('/api/presentation/:id', slides.getPresentation,
                                 slides.storePresentation,
                                 slides.getSlideImage, 
                                 slides.storeSlides)
// app.get('/api/presentation/getslide/', slides.getSlideImage);
app.get("/oauth2callback", function(req, res) {
  const code = req.query.code
  oauth2Client.getToken(code, function(err, tokens) {
    if (!err) {
      oauth2Client.setCredentials(tokens)
      req.session.tokens = tokens
      res.redirect(`/api/presentation/${req.session.presentation_id}`)
      return
    }
    res.status(500).send(err)
  })
})
//////////////////////////////////////////////////////////////////
// LOGIN ENDPOINTS
app.get('/google/auth/login', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile']}))
app.get('/google/auth/logincallback', passport.authenticate('google', { 
  successRedirect: 'http://localhost:3000/',
  failureRedirect: 'http://localhost:3000/login',
  failureflash: true}))

app.get('/login', () => console.log('Login'))
app.post('/login', passport.authenticate(['local'], { successRedirect: '/',
                                                      failureRedirect: '/login',
                                                      failureflash: true }));
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
    res.send(newUser)})
    .catch(console.log);
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
  }).then(newSlide => res.send(newSlide))
})
//////////////////////////////////////////////////////////////////
// WEBSERVER INIT
const server = app.listen(PORT, () => console.log(`Listening for socket connections on port ${PORT}`));

// SOCKET INIT
const io = socket(server);