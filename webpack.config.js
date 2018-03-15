const path = require('path');
const glob = require('glob-all');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

const cssnano = require('cssnano');

const config = {};
config.module = {};

config.entry = {
  app: './src/index.jsx',
};

config.output = {
  path: path.resolve(__dirname, './dist'),
  filename: 'bundle.js',
};

config.module.rules = [
  {
    test: /\.(js|jsx)/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['es2017', 'react'],
      },
    },
  },
  {
    test: /\.(scss|sass)$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'sass-loader'],
    }),
  },
];

config.plugins = [
  new HtmlPlugin({
    template: './src/index.html',
  }),
  new ExtractTextPlugin({
    filename: '[name].css',
  }),
  new OptimizeCssAssetPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: cssnano,
    cssProcessorOptions: { discardComments: { removeAll: true } },
    canPrint: true,
  }),
  new PurifyCSSPlugin({
    paths: glob.sync([
      path.resolve(__dirname, 'src/*.html'),
      path.resolve(__dirname, 'src/components/*'),
      path.resolve(__dirname, 'src/components/header/*'),
    ]),
  }),
];

config.devServer = {
  port: 5000,
};

config.resolve = {
  extensions: ['.js', '.jsx'],
};

module.exports = config;
