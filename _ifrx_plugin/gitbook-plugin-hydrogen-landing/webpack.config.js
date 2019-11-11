let path = require('path')
// let webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
module.exports = {
  entry: {
    index: './assets/plugin.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'assets'),
        ],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        // include: [
        //   path.resolve(__dirname, 'assets'),
        // ],
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf)$/,
        exclude: /node_modules/,
        use: [
          'url-loader?limit=10000',
        ],
      },
    ],
  },
  plugins: [
    new ManifestPlugin(),
  ],
  externals: {
    jQuery: 'jQuery',
    gitbook: 'gitbook',
  },
}
