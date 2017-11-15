const express = require('express');
const cors = require('cors');
const {json} = require('body-parser');
const session = require('express-session');

const Sequelize = require('sequelize');
const db = require('./config/db.js');

const {google_auth_url, oauth2Client} = require('./googleAuth');
const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const {PORT, SOCKET_PORT, DATABASE_URI, SESSION_SECRET} = require('../.config');
// Code for simultaneously allowing http and https connections.
// const https = require('https');
// const http = require('http');
// const fs = require('fs');
// let options = {
//   key: fs.readFileSync(__dirname + '/../server.key'),
//   cert: fs.readFileSync(__dirname + '/../server.crt'),
//   requestCert: false,
//   rejectUnauthorized: false
// }
// const server = http.createServer(app).listen(PORT, () => console.log(`Listening for socket connections on port ${PORT}`));
// const server_secure = https.createServer(options, app).listen(4000);
const socket = require('socket.io');
// const io = require('socket.io')();
// Controllers
const slides = require('./controllers/slides_controller');
//////////////////////////////////////////////////////////////////
// Database
//////////////////////////////////////////////////////////////////
const sequelize = new Sequelize(DATABASE_URI, {
  dialectOptions: {
      ssl: true
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
//////////////////////////////////////////////////////////////////
// App Setup
//////////////////////////////////////////////////////////////////
const app = express();
app.use(cors());
app.use(json());
app.use(session({
  secret: SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));
//////////////////////////////////////////////////////////////////
// GOOGLE AUTH ENDPOINTS
//////////////////////////////////////////////////////////////////
// app.get('/api/presentation/getpresentation/:id', isAuthed(google_auth_url));
app.get('/api/presentation/getpresentation/:id', function(req, res, next){
  req.session.presentation_id = req.params.id;
  res.redirect(google_auth_url)}  );
app.get('/api/presentation/:id', function(req, res, next){console.log('Retrieving presentation info for: ' + req.params.id); next()}, 
                                 slides.getPresentation, 
                                 slides.getSlideImage, 
                                 slides.storeSlides)
app.get('/api/presentation/getslide/', slides.getSlideImage);
app.get("/oauth2callback", function(req, res) {
  const code = req.query.code
  console.log(code)
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
// console.log(db);
app.post('/user', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.users.create({
    username,
    password
  }).then(
    newUser => {
      res.send(newUser)
    })
})

app.post('/slide', (req, res) => {
  const slide_number = req.body.slide_number;
  const url = req.body.url;
  const parent_presentation = req.body.parent_presentation;
  console.log('callingDB')
  db.slides.create({
    slide_number,
    url,
    parent_presentation
  }).then(
    newSlide => {
      res.send(newSlide)
    })
})


// google.options({
//   auth: oauth2Client
// });
//////////////////////////////////////////////////////////////////
// SOCKET SETUP
//////////////////////////////////////////////////////////////////
const server = app.listen(PORT, () => console.log(`Listening for socket connections on port ${PORT}`));

const io = socket(server);
io.on('connect', socket => {
  const socketID = socket.id;
  // const message = {text: 'Fucking sockets, man!'}
  // setInterval(() => {
  //   socket.emit('test', message);
  //   console.log('message emitted: ' + message.text)
  // }, 5000000);
  console.log(`${socket.id} connected!`)
  socket.on('disconnect', (socket) => {
    console.log(`${socketID} disconnected`);
  });

})

// app.listen(PORT, () => console.log(`listening on port ${PORT}`));