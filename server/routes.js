'use strict';
var express = require('express');
var busboy = require("connect-busboy");
var fs = require('fs');
var path = require('path');
// var sizeOf = require('image-size');
var mongoose = require('mongoose');

var router = express.Router();
var User = require('./models/User');
var _ = require('lodash');
router.get('/', function indexRouteHandler (req, res) {
  res.render('view', {
  	title: "Prueba",
    token: _.uniqueId()
  });
});
router.use(busboy());
router.post("/upload/:id", function(req, res){
  User.findById(req.params.id, function (err, user) {
    if (err) {
      res.json({
        sucess: false,
        msg: 'error db'
      });
    } else {
      var fstream;
      req.pipe(req.busboy);
      var files_upload = [];
    	req.busboy.on("file", function(fieldName, file, filename, encoding, mimetype) {
        var isImage = /image\/(jpeg|jpg|gif|png)$/i.test(mimetype);
        if(isImage){
          var id = mongoose.Types.ObjectId();
          var extension = path.extname(fieldName);
          var fileNameGenerated = id  + extension;
          var pathFileName = __dirname + '/../public/files/' + fileNameGenerated;
          var URL = '/files/' + fileNameGenerated;

          file.pipe(fs.createWriteStream(pathFileName));
          user.images.push({
            _id: id,
            path: pathFileName,
            URL:URL
          })
          user.save(function(err, user) {
            if (err) {
              res.send(err);
            }
          });
          files_upload.push({
            file: fieldName,
            success: true
          });
        } else {
          files_upload.push({
            file: fieldName,
            msg: 'solo formato de imágenes',
            success: false
          });
        }
    	});
      req.busboy.on('finish', function() {
        res.json({
          sucess: true,
          items: files_upload
        });
      });
    }
  });
});
router.get('/api', function(req, res) {
  User.find({}, function(err, users) {
    if (err)
      res.status(500).json(err);
    res.json(users);
  })
});
router.get('/api/:id', function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err)
      res.status(500).json(err);
    res.json(user);
  })
});
router.post('/api', function(req, res) {
  var user = new User(req.body);
  user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
});
router.put('/api/:id', function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      _.extend(user, req.body);
      user.save(function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
      });
    }
  });
});
router.delete('/api/:id', function(req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
});

router.get('/api/:id', function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
});

module.exports = router;
