const router = require('express').Router();
const Movies = require('../models/movies.model');

router.route('/').get((req, res) => {
  const searchTerm = req.query.search; 
  const pageOffset = parseInt(req.query.pageOffset); 
  if(searchTerm){
    Movies.find({
      $or: [
        { title: { '$regex': searchTerm, '$options' : 'i'} },
        { description: { '$regex': searchTerm, '$options' : 'i'} }
      ]
    })
    .sort({'rateing': -1})
    .skip(pageOffset)
    .limit(10)
    .then(movies => res.json(movies))   
    .catch(err => res.status(400).json('Erros: ' + err));
  } else {
    Movies.find()
    .sort({'rateing': -1})
    .skip(pageOffset)
    .limit(10)
    .then(movies => res.json(movies))    
  }
  
});

router.route('/:id').post((req,res) => {
  Movies.findById(req.params.id)
    .then(movie => {
      console.log(movie);
      movie.user_rateing.push(req.body.rateing)
      const total = movie.user_rateing.reduce((previousValue, currentValue) => previousValue + currentValue)
      movie.rateing = (total / movie.user_rateing.length).toFixed(2);
      movie.save()
      .then(updatedMovie => res.json(updatedMovie))
    })
    .catch(err => res.status(400).json('Erros: ' + err));
})





module.exports = router;