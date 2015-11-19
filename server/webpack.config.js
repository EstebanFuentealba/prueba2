/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './client/main'
  ],
  devtool: "source-map",
  output: {
    path: path.join(__dirname , '/../public/__build__/'),
    filename: 'bundle.js',
    publicPath: '/__build__/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: "babel-loader?stage=0",
      include: path.join(__dirname, "..",  "client")
    }]
  },
  resolve: {
    extensions: ['', '.react.js', '.js', '.jsx', '.scss'],
    modulesDirectories: [
      "client", "node_modules"
    ]
  },
};
