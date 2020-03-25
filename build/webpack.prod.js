const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseWebpack = require('./webpack.base.js');

module.exports = merge(baseWebpack, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      templateParameters: {
        BASE_URL: '',
        title: 'webpack demo',
      },
    }),
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
    },
  },
});
