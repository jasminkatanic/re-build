const router = require('express').Router();
const Shows = require('../models/shows.model');

router.route('/').get((req, res) => {
  const searchTerm = req.query.search;
  const pageOffset = parseInt(req.query.pageOffset); 

  if(searchTerm){
    Shows.find({
      $or: [
        { title: { '$regex': searchTerm, '$options' : 'i'} },
        { description: { '$regex': searchTerm, '$options' : 'i'} }
      ]
    })
    .sort({'rateing': -1})
    .skip(pageOffset)
    .limit(10)
    .then(shows => res.json(shows))   
    .catch(err => res.status(400).json('Erros: ' + err));
  } else {
    Shows.find()
    .sort({'rateing': -1})
    .skip(pageOffset)
    .limit(10)
    .then(shows => res.json(shows))    
  }    
});

router.route('/:id').post((req,res) => {
    Shows.findById(req.params.id)
      .then(show => {        
        show.user_rateing.push(req.body.rateing)
        const total = show.user_rateing.reduce((previousValue, currentValue) => previousValue + currentValue)
        show.rateing = (total / show.user_rateing.length).toFixed(2);
        show.save()
        .then(updatedShow => res.json(updatedShow))
      })
      .catch(err => res.status(400).json('Erros: ' + err));
  })






module.exports = router;