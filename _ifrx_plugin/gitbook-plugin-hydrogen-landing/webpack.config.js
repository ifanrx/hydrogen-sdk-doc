let path = require('path')
// let webpack = require('webpack')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')
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
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.js$/,
        // include: [
        //   path.resolve(__dirname, 'src'),
        // ],
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
    // new VueLoaderPlugin(),
  ],
  externals: {
    // jQuery: 'jQuery',
    // gitbook: 'gitbook',
  },
  resolve: {
    // extensions: ['.js', '.vue', '.scss', '.png', '.jpg'],
    // modules: [path.resolve(__dirname, './src'), 'node_modules'],
    alias: {
      // vue: 'vue/dist/vue.esm',
    },
  },
}
