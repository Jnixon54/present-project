const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI} = require('../.config');

const oauth2Client = new OAuth2 (
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
)

const scopes = [
  'https://www.googleapis.com/auth/presentations.readonly'
];

const google_auth_url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

exports.google_auth_url = google_auth_url;
exports.oauth2Client = oauth2Client;