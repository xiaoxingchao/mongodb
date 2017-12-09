var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = require('../models/movie')
mongoose.connection.openUri('mongodb://localhost/imooc');

/* GET home page. */
router.get('/', function(req, res, next) {
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err)
    }
    res.render('index', { 
      title: '首页' ,
      movies:movies
    });
  })
  
});

module.exports = router;
