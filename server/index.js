const express = require('express');
const cors = require('cors');
const {json} = require('body-parser');
const Sequelize = require('sequelize');
const {PORT, DATABASE_URI} = require('../.config');
const session = require('express-session');
const {google_auth_url, oauth2Client} = require('./googleAuth');
const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const {isAuthed} = require('./middleware/googleRedirect');
// Database
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

// Controllers
const slides = require('./controllers/slides_controller');

const app = express();

app.use(cors());
app.use(json());
// app.options('*', cors())

// app.get('/api/presentation/getpresentation/:id', isAuthed(google_auth_url));
app.get('/api/presentation/getpresentation/:id', function(req, res){res.redirect(google_auth_url)});
// app.get('/api/presentation/getslide/', slides.getSlideImage);

// app.get('/oauth2callback',function(req, res){
//   const code = req.query.code;
//   oauth2Client.getToken(code, function(err, tokens) {
//     console.log('testing weiners')
//     if(!err){
//       oauth2Client.setCredentials(tokens);
//       res.redirect('/');
//       return;
//     }
//     res.status(500).send(err);
//   })
// });
// https://localhost:3001/oauth2callback?code=4/YnDzCqzgqChyzE_iWp9PzEpFSQPCYraEeY1Gwfv8IKw#
// (req, res, next) => {req.headers.authorization = 'value'; next();}


// app.get("/login", function(req,res) {
  // res.redirect(google_auth_url)
// })

app.get("/oauth2callback", function(req, res) {

  const code = req.query.code
  console.log("doodydoooo")
  console.log(req.query)
  oauth2Client.getToken(code, function(err, tokens) {
    if (!err) {
      oauth2Client.setCredentials(tokens)
      // req.session.tokens = tokens
      res.redirect('/')
      return
    }
    res.status(500).send(err)
  })
})
// app.get('/api/test/', (req, res, next) => {
//   res.json("success")
// })

app.listen(PORT, () => console.log(`listening on port ${PORT}`));