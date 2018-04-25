/**
 * 功能：转换fis3中的 // @require '../style/index.css'
 * 为 require('../style/index.css');
 */

 // webpack.config.js配置方法
 module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['comment-require-loader'],
        // 针对采用了 fis3 CSS 导入语法的 JavaScript 文件通过 comment-require-loader 去转换 
        include: [path.resolve(__dirname, 'node_modules/imui')]
      }
    ]
  }
}

// loader内容

function replace(source) {
  return source.replace(/(\/\/ *@require) +(('|").+('|")).*/, 'require($2)')
}

module.exports = function(content) {
  return replace(content)
}