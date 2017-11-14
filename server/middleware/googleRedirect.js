module.exports = {
  isAuthed: function(google_auth_url){
    return function(req, res, next){
      // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      // res.header('Access-Control-Allow-Credentials', true);
      // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      // console.log(res)
      // console.log(google_auth_url);
      // next();
      console.log(res);
      // res.setHeader("Content-Type", "text/html");
      return res.redirect(google_auth_url);
      next();
      console.log('doody-doo')
      // res.json({ url : google_auth_url });
  }},
  redirect: function(req, res, next) {

  }
}

// "https://cors-anywhere.herokuapp.com/" + 