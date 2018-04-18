const path = require('path')

module.exports = {
  // 项目入口文件
  entry: './main.js',
  output: {
    // 打包文件地址
    filename: 'bundle.js',
    // 项目输出文件地址
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        // 正则匹配所有css文件
        test: /\.css$/,
        // 由后往前，以querystring传递参数
        use: ['style-loader', 'css-loader?minimize']
      }
    ]
  }
}