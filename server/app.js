var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var mongoose = require('mongoose');
var routes = require('./routes');
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 5000));
var compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(require('webpack-hot-middleware')(compiler));
app.use('/', routes);
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './../public/index.html'));
});
mongoose.connect('mongodb://localhost/prueba',  function(err) {
  if (err) throw err;
  // Start the server
  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
});
