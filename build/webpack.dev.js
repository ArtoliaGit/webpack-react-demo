const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpack = require('./webpack.base');
const utils = require('./utils');
const config = require('../config');

module.exports = merge(baseWebpack, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.sourceMap,
      extract: false,
    }),
  },
  devServer: {
    contentBase: path.join(__dirname, '../public'),
    publicPath: '/',
    port: config.dev.port,
    host: config.dev.host,
    // public: 'localhost:3000',
    useLocalIp: true,
    open: true,
    compress: true,
    bonjour: true,
    hot: true,
    https: false,
    overlay: true,
    stats: 'minimal',
    before: (app, server) => {
      console.log('配置自定义处理程序');
    },
    after: (app, serser) => {
      console.log('自定义中间件');
    },
    proxy: {
      '/api': {
        target: 'http://localhost: 2000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
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
