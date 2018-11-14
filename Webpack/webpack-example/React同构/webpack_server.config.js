const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './main_server.js',
  // 避免将node内置模块打包到输出文件中
  target: 'node',
  // 避免输出node_modules第三方模块
  externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs2',
    filename: 'bundle_server.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        // CSS代码需要被服务端代码忽略
        test: /\.css$/,
        use: ['ignore-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map'
}