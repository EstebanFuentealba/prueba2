var deepExtend = require('deep-extend');
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

var assetsPath = path.join(__dirname, "..", "public");
var publicPath = "/";

var commonConfiguration = {
  name: "browser",
  context: path.join(__dirname, "..", "client"),
  entry: {
    application: "main"
  },
  output: {
    path: assetsPath,
    filename: "[name].js",
    publicPath: publicPath
  },
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: "babel-loader?stage=0",
        include: path.join(__dirname, "..",  "client")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?module&localIdentName=[local]__[hash:base64:5]' +
          '&sourceMap!sass?sourceMap&outputStyle=expanded' +
          '&includePaths[]=' + (path.resolve(__dirname, '../node_modules'))),
      }
    ]
  },
  resolve: {
    extensions: ['', '.react.js', '.js', '.jsx', '.scss'],
    modulesDirectories: [
      "client", "node_modules"
    ]
  },
};
console.log('node environment:' + process.env.NODE_ENV);
var config;
if (process.env.NODE_ENV == 'production') {
  config = deepExtend(commonConfiguration, {
    name: "server-side rendering",
    target: "node"
  });
  config.plugins = [
    new ExtractTextPlugin("main.css"),
    new webpack.optimize.UglifyJsPlugin()
  ]
} else {
  config = deepExtend(commonConfiguration, {
      devtool: "source-map",
      module: {
        preLoaders: [
          {
            test: /\.js$|\.jsx$/,
            exclude: /node_modules/,
            loaders: []
            /*loaders: ["eslint"]*/
          }
        ]
      }
  });
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
module.exports = [config];
