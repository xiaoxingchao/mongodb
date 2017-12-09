var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = require('../models/movie')
mongoose.connection.openUri('mongodb://localhost/imooc');


/* GET home page. */
router.get('/admin/update/:id', function(req, res, next) {
  var id = req.params.id;
  Movie.findById(id,function(err,movie){
    if(err){
      console.log(err)
    }
    res.render('admin', { 
      title: '更新页面',
      movie:movie
    });
  })
  
});

module.exports = router;
