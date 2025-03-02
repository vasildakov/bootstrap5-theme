const { merge } = require('webpack-merge');
const webpackCommonConfig = require('./webpack.config.common');
const paths = require('./paths');

module.exports = merge(webpackCommonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    open: true,
    liveReload: true,
    hot: true,
    watchFiles: [`${paths.src}/*.html`, `${paths.src}/images/**.*`, 'src/**/*'],
    port: process.env.PORT || 8088,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(gif|ico|jpe?g|png|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  /* Additional plugins configuration */
  plugins: [],
});
