const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpack = require('./webpack.base.js');

module.exports = merge(baseWebpack, {
  mode: 'development',
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      templateParameters: {
        BASE_URL: '',
        title: 'webpack demo',
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
    },
  },
});
