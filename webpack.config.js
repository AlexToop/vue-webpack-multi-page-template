const CopyPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

module.exports = {
  entry: {
    index: './src/main.js',
    about: './src/about/main.js'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin([
      { from: 'src/index.html', to: '../index.html' },
      { from: 'src/about/index.html', to: '../about' },
      { from: 'src/assets/img/*', to: '../img/', flatten: true },
      { from: 'src/assets/favicon/*', to: '../', flatten: true }
    ])
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/js')
  },
  devServer: {
    contentBase: 'build',
    compress: false,
    watchContentBase: true,
    publicPath: '/js/',
    port: 1234
  }
}
