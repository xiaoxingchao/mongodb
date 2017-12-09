var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var list = require('./routes/list');
var admin = require('./routes/admin');
// var detail = require('./routes/detail');
var save = require('./routes/save');
var update = require('./routes/update');
var serveStatic = require('serve-static');
var mongoose = require('mongoose');
var Movie = require('./models/movie');
mongoose.Promise = global.Promise;
mongoose.connection.openUri('mongodb://localhost/imooc');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.use('/', index);
app.use('/users', users);
app.use('/admin/list', list);
app.use('/admin/movie', admin);
// app.use(detail);
app.use(save);
app.use(update);

app.get('/movie/:id', function(req, res, next) {
    
    var id = req.params.id;
    
    console.log(req.params);
    Movie.findById(id,function(err,movie){
        if(err){
            console.log(err)
        }
        console.log(movie)
        res.render('detail', { 
            title: '详情页' + movie.title,
            movie:movie
        });
    })
})
app.delete('/admin/list',function(req,res){
    var id = req.query.id;
    
    if (id) {
        Movie.remove({
            _id: id
        }, (err) => {
            if (err) {
                console.error(err);
            }
            else {
                res.json({success: 1})
            }
        })
    }
})









// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
