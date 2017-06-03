const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const CordovaPlugin = require('webpack-cordova-plugin');
// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  },
  entry: {
    app: './src/Main.ts',
    vendor: ['pixi', 'p2', 'phaser']
  },
  output: {
    path: path.resolve(__dirname, 'www'),
    publicPath: 'www/',
    filename: 'bundled.game.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.js$/, enforce: 'pre', use: 'source-map-loader' },
      { test: /\.ts?$/, exclude: /node_modules/, use: 'ts-loader' },
      { test: /pixi\.js/, use: 'expose-loader?PIXI' },
      { test: /phaser-split\.js$/, use: 'expose-loader?Phaser' },
      { test: /p2\.js/, use: 'expose-loader?p2' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.phaser.js' }),
    new webpack.HotModuleReplacementPlugin(),
    new LiveReloadPlugin(),
    new CordovaPlugin({
      config: 'config.xml',
      src: 'index.html',
      platform: 'android',
    })
  ],
};
