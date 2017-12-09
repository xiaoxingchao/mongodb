var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = require('../models/movie')
// mongoose.connection.openUri('mongodb://localhost/imooc');
mongoose.Promise = global.Promise;
mongoose.connection.openUri('mongodb://localhost/imooc');
/* GET home page. */
router.get('/', function(req, res, next) {
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err)
    }
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.json(movies);  
    res.render('list', { 
      title: 'list页面',
      movies:movies
    });
  })
  
});

module.exports = router;
