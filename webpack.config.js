'use strict';
const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, './App');
const BUILD_DIR = path.resolve(__dirname, './build');

let config = {
  module : {
    loaders : [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader : 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  },
  entry: {

    bundle: APP_DIR + '/index.js'
  },
  output: {
    path: BUILD_DIR,
    // Gets name of object prop, bundle in this case
    filename: '[name].js'
  }
};

module.exports = config;
