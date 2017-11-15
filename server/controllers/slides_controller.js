const axios = require('axios');

module.exports = {
  getPresentation: function(req, res, next){
    const presentationId = req.params.id;
    const slides_array = [];
    req.session.current_presentation_id = presentationId;
    res.locals.current_presentation_id = presentationId;
    axios.get(`https://slides.googleapis.com/v1/presentations/${presentationId}`, {
      headers: { Authorization: 'Bearer ' + req.session.tokens.access_token }
    }).then(result => {
      for(let i = 0; i < result.data.slides.length; i++){
        slides_array.push({presentationId: presentationId, objectId: result.data.slides[i].objectId})
      }
      req.session.slides_array = slides_array;
      res.locals.slides_array = slides_array;
      // console.log(req.session);
      next();
    }).catch(console.log);
  },
  // storePresentation: function(req, res, next){
  //   axios.
  // },
  getSlideImage: function(req, res, next){
    // const presentationId = req.session.current_presentation_id;
    // const slides_array = req.session.slides_array;
    const presentationId = res.locals.current_presentation_id;
    const slides_array = res.locals.slides_array
    const promises = [];
    // Batching all axios requests
    for (let i = 0; i < slides_array.length; i++){
      promises.push(
        axios.get(`https://slides.googleapis.com/v1/presentations/${presentationId}/pages/${slides_array[i].objectId}/thumbnail`, {
          headers: { Authorization: 'Bearer ' + req.session.tokens.access_token }
      }));
    }
    // Calling all axios requests
    axios.all(promises).then(results => {
      results.forEach((result, index) => {
        // console.log(result.data.contentUrl);
        slides_array[index].slide_number = index + 1;
        slides_array[index].contentUrl = result.data.contentUrl;
      })
    }).then(() => {
      res.locals.slides_array = slides_array;
      next();
    }).catch(console.log);
  },
  storeSlides: function(req, res, next){
    const slides_array = res.locals.slides_array;
    promises = [];
    for (let i = 0; i < slides_array.length; i++){
      promises.push(
        axios.post(`http://localhost:3001/slide`, {
          url: slides_array[i].contentUrl,
          slide_number: slides_array[i].slide_number,
          parent_presentation: slides_array[i].presentationId
        })
      );
    }
    axios.all(promises).catch(console.log)
    res.redirect('http://localhost:3000/')
  }
}