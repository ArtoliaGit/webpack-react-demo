const path = require('path');

const resolve = (dir) => path.join(__dirname, '..', dir);

const createLintingRule = () => ({
  test: /\.(js|jsx)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    emitWarning: true,
    fix: true,
    cache: true,
  },
});

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: resolve('dist'),
    publicPath: '',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      ...[createLintingRule()],
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
      },
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: 'html-loader',
      //       options: {
      //         minimize: true,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpe?g|gif|svg|bmp)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:8].[ext]',
        },
      },
    ],
  },
};
