const axios = require('axios');

module.exports = {
  getPresentation: function(req, res, next){
    const presentationId = req.params.id;
    const slides_array = [];
    axios.get(`https://slides.googleapis.com/v1/presentations/${presentationId}`, {
      headers: { Authorization: 'Bearer ' + req.session.tokens.access_token }
    }).then(result => {
      for(let i = 0; i < result.data.slides.length; i++){
        slides_array.push({ presentationId: presentationId, 
                            objectId: result.data.slides[i].objectId})
      }
      res.locals.slides_array = slides_array;
      res.locals.presentationId = presentationId;
      next();
    }).catch(console.log);
  },
  storePresentation: function(req, res, next){
    console.log('STORE', res.locals);
    axios.post('http://localhost:3001/presentation', { owner_id: req.session.user,
                                                       id_string: res.locals.presentationId
    }).then(response => {
      res.locals.parent_id = response.data.id
      next()
    }).catch(err => console.log('Presentation Storage Error: ', err));
  },
  getSlideImage: function(req, res, next){
    const slides_array = res.locals.slides_array
    const promises = [];
    // Batching all axios requests
    for (let i = 0; i < slides_array.length; i++){
      promises.push(
        axios.get(`https://slides.googleapis.com/v1/presentations/${res.locals.presentationId}/pages/${slides_array[i].objectId}/thumbnail`, {
          headers: { Authorization: 'Bearer ' + req.session.tokens.access_token }
      }));
    }
    // Calling all axios requests
    axios.all(promises).then(results => {
      results.forEach((result, index) => {
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
    const promises = [];
    for (let i = 0; i < slides_array.length; i++){
      promises.push(
        axios.post('http://localhost:3001/slide', { url: slides_array[i].contentUrl,
                                                    slide_number: slides_array[i].slide_number,
                                                    parent_presentation: slides_array[i].presentationId,
                                                    parent_id: res.locals.parent_id
        })
      );
    }
    axios.all(promises).catch(console.log)
    res.redirect('http://localhost:3000/')
  }
}