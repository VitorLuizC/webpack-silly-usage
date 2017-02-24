const path = require('path');
const { optimize } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config =  {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: './dist'
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'stylus-loader']
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/style.css')
  ],
  devtool: 'inline-source-map',
  target: "web"
};

module.exports = function (env) {
  if (env === 'production') {
    config.plugins.push(new optimize.UglifyJsPlugin());
    config.devtool = false;
  }

  return config;
};
