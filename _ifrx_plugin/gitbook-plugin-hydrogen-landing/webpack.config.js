let path = require('path')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: {
    index: './src/plugin',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    new WebpackAssetsManifest(),
    new ExtractTextPlugin('[name].[hash].css')
  ],
}
