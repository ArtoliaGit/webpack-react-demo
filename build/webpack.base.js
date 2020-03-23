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
    // cache: true,
  },
});

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].[hash:8].js',
    path: resolve('dist'),
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

    ]
  },
};
