const path = require('path');
const { optimize } = require('webpack');

const config =  {
  entry: './src/script/index.js',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist/js')
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ['css-loader', 'style-loader', 'stylus-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  devtool: 'inline-source-map',
  target: "web"
};

module.exports = function (env) {
  if (env === 'production') {
    config.plugins = [new optimize.UglifyJsPlugin()];
    config.devtool = false;
  }

  return config;
};
