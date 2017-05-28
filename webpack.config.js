const path = require('path');
const webpack = require('webpack');

const LiveReloadPlugin = require('webpack-livereload-plugin');
const phaserModulePath = path.join(__dirname, '/node_modules/phaser-ce/')

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'game.js'
  },
  module: {
    rules: [
      { test: /\.js$/, enforce: 'pre', loader: 'source-map-loader' },
      { test: /\.ts?$/, enforce: 'pre', use: 'source-map-loader' },
      { test: /\.ts?$/, exclude: /node_modules/, use: ['babel-loader', 'ts-loader'] },
      {
        test: /pixi\.js/, use: [{ loader: 'expose-loader', options: 'PIXI' }],
      },
      {
        test: /phaser-split\.js$/, use: [{ loader: 'expose-loader', options: 'Phaser' }],
      },
      {
        test: /p2\.js/, use: [{ loader: 'expose-loader', options: 'p2' }],
      }
    ]
  },
  plugins: [new LiveReloadPlugin(), new webpack.HotModuleReplacementPlugin()],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      phaser: path.join(phaserModulePath, 'build/custom/phaser-split.js'),
      pixi: path.join(phaserModulePath, 'build/custom/pixi.js'),
      p2: path.join(phaserModulePath, 'build/custom/p2.js')
    }
  },
  devtool: 'inline-source-map'
};
