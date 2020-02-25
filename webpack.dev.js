const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'node_modules/thaisamut/static/msa_index.ftl',
      filename: 'index_template.ftl',
      chunks: [''],
      externalCSS: [
        '${staticResourceContextPath}/jsbuilt/vendor.bundle.css"',
      ],
      externalJS: [
        '${staticResourceContextPath}/jsbuilt/vendor.bundle.js',
        '${staticResourceContextPath}/jsbuilt/app.bundle.js',
        'http://localhost:35729/livereload.js',
      ],
    }),
  ]
});