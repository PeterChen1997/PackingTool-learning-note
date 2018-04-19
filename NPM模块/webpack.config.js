const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  output: {
    // 输出的代码符合 CommonJS 模块化规范，以供给其它模块导入使用。
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        // 增加对 CSS 文件的支持
        test: /\.css/,
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        }),
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // 输出的 CSS 文件名称
      filename: 'index.css',
    }),
  ],
  // 输出 Source Map
  devtool: 'source-map'
};