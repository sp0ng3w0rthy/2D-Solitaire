const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')

module.exports = {
  entry: {
    app: './src/main.ts',
    vendor: ['pixi', 'p2', 'phaser']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.js$/, enforce: 'pre', use: 'source-map-loader' },
      { test: /\.ts?$/, enforce: 'pre', use: 'source-map-loader' },
      { test: /\.ts?$/, exclude: /node_modules/, use: 'ts-loader' },
      { test: /pixi\.js/, use: 'expose-loader?PIXI' },
      { test: /phaser-split\.js$/, use: 'expose-loader?Phaser' },
      { test: /p2\.js/, use: 'expose-loader?p2' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: 'vendor.bundle.js'/* filename= */ }),
    new webpack.HotModuleReplacementPlugin(),
    new LiveReloadPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  },
};
