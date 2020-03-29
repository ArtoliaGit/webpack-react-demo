const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const baseWebpack = require('./webpack.base.js');
const utils = require('./utils');
const config = require('../config');

module.exports = merge(baseWebpack, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.sourceMap,
      extract: true,
    }),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
      templateParameters: {
        BASE_URL: '',
        title: 'webpack demo',
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({}),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: config.build.sourceMap ?
            {
              inline: false,
              annotation: true,
            } : false,
        },
        cssProcessorPluginOptions: {
          preset: ['default', { minifyFontValues: { removeQuotes: false } }],
        },
      }),
    ],
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(c|le|sc|sa)ss$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
});
