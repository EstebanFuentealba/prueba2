'use strict';

var express = require('express');
var path = require('path');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');
var mongoose = require('mongoose');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.set('views', __dirname + '/');
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public')));
app.use('/', routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

mongoose.connect('mongodb://localhost/prueba',  function(err) {
  if (err) throw err;
  // Start the server
  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
});
