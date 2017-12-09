var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = require('../models/movie')


/* GET home page. */
router.get('/movie/:id', function(req, res, next) {

  var id = req.params.id;
  debugger;
  console.log(req.params);
  Movie.findById(id,function(err,movie){
    if(err){
      console.log(err)
    }
    res.render('detail', { 
      title: '详情页' + movie.title,
      movie:movie
    });
  })
  
});

module.exports = router;
