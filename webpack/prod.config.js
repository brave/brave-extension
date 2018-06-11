const path = require('path')
const webpack = require('webpack')
const postCSSConfig = require('./postcss.config')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const customPath = path.join(__dirname, './customPublicPath')

module.exports = {
  mode: 'production',
  entry: {
    braveShieldsPanel: [customPath, path.join(__dirname, '../app/braveShieldsPanel')],
    background: [customPath, path.join(__dirname, '../app/background')]
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          comments: false,
          compressor: {
            warnings: false
          }
        }
      })
    ]
  },
  output: {
    path: path.join(__dirname, '../build/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react-optimize']
        }
      }, {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          {loader: 'postcss-loader', options: postCSSConfig}
        ]
      }]
  }
}
