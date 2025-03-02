'use strict';

//const fs = require('fs');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

// import and configure dotenv
require('dotenv-defaults').config();

const paths = require('./paths');

const layout = `${paths.src}/index.html`;
const templates = `${paths.src}/templates`;

let publicUrl = process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : '/';
if (!publicUrl) {
  publicUrl = '/';
} else if (!publicUrl.endsWith('/')) {
  // ensure last slash exists
  publicUrl = publicUrl + '/';
}

module.exports = {
  entry: {
    index: `${paths.src}/index.js`,
  },
  output: {
    path: paths.dist,
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // Image assets
      {
        test: /\.(gif|ico|jpe?g|png|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      // Fonts
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: layout,
      templateParameters: {
        publicUrl: publicUrl.slice(0, -1),
      },
      title: 'Bootstrap 5 Typo',
      filename: 'index.html',
      content: templates + '/home.html',
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: layout,
      templateParameters: {
        publicUrl: publicUrl.slice(0, -1),
      },
      title: 'Math',
      filename: 'math.html',
      content: templates + '/math.html',
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: layout,
      templateParameters: { publicUrl: publicUrl.slice(0, -1) },
      title: 'Articles',
      filename: 'articles.html',
      content: templates + '/articles.html',
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: layout,
      templateParameters: { publicUrl: publicUrl.slice(0, -1) },
      title: 'Article',
      filename: 'article.html',
      content: templates + '/article.html',
      inject: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: '**/*',
          context: paths.public,
        },
      ],
    }),
    new ESLintPlugin({
      extensions: 'js',
      context: paths.src,
    }),
    new StylelintPlugin({
      extensions: ['css', 'scss'],
      context: paths.src,
    }),
    new Dotenv(),
    new HtmlWebpackInjector(),
    new LiveReloadPlugin({
      appendScriptTag: true,
    }),
    new ExtraWatchWebpackPlugin({
      dirs: path.resolve(__dirname, 'src'),
      files: ['./src/**/*.html', './src/templates/**/*.html'], // This does not work
    }),
  ],
};
