const axios = require('axios');

module.exports = {
  getPresentation: function(req, res, next){
    const presentationId = req.params.id;
    console.log('req headers ' + req.headers.authorization)
    console.log(presentationId);
    axios.get(`https://slides.googleapis.com/v1/presentations/${presentationId}`, {
      headers: { authorization: req.headers.authorization }
    }).then(result => res.send(result.data))
      .catch(console.log)
  },
  getSlideImage: function(req, res, next){
    const presentationId = "1oCNQlcuNkiRwJu660XBnvZTHYdEOqw4DIJzPvOv85ek";
    const pageObjectId = "gc6f972163_0_0";
    axios.get(`https://slides.googleapis.com/v1/presentations/${presentationId}/pages/${pageObjectId}/thumbnail`, {
      headers: { authorization: req.headers.authorization }
    }).then(result => res.send(result.data))
      .catch(console.log)
  }
}