# note

## css/style-loader 作用

- css-loader作用是处理css中的 @import 和 url这样的外部资源
- style-loader作用是把样式插入到DOM中，方法是在head中插入style标签，并吧样式写到innerHTML内

![imgs](https://github.com/lihongxun945/diving-into-webpack/raw/master/images/style-loader-and-css-loader-pipeline.png)

## style-loader原理

- 通过require来获取css文件的内容，得到一个字符串
- 调用addStyles把CSS内容插入到DOM中去

### 主要源码

```js
module.exports.pitch = function (request) {
    return [
        "var content = require(" + loaderUtils.stringifyRequest(this, "!!" + request) + ");", // 获取 CSS 文件的内容
        "if(typeof content === 'string') content = [[module.id, content, '']];",
        "// Prepare cssTransformation",// 省略无关内容
        "// add the styles to the DOM",
        "var update = require(" + loaderUtils.stringifyRequest(this, "!" + path.join(__dirname, "lib", "addStyles.js")) + ")(content, options);", // 调用 addStyles ，把CSS内容插入到DOM中去
        "if(content.locals) module.exports = content.locals;", // 支持 css modules，如果启用了 css modules，class的映射就放在 content.locals 中，因此直接默认导出，我们 import 的时候就会得到一个映射字典。
        options.hmr ? hmrCode : ""
    ].join("\n");
}
```

感叹号是干什么的 参考 https://webpack.github.io/docs/loaders.html#loader-order 文档的说明，感叹号是用来忽略loader配置的。因为我们的 style-loader 是用来加载 css 文件的，如果不忽略配置会出现无限递归调用的情况。即 style-loader 里面调用了 require(‘xxx.css’) ，这个require又会去调用 style-loader，于是就无限循环了。

loaderUtils.stringifyRequest 这个方法是把绝对路径转成相对路径的，参考 这个文档的说明 https://github.com/webpack/loader-utils。注意他返回的字符串已经带了引号了。

addStyle做了什么 可以直接读 style-loader 的源码，其实 addStyle 做的核心的事情就是在head中插入了一个 style标签，并把 CSS 内容写入这个标签中

## css-loader

为什么要有css-loader呢

- 解析@import url等语句
- style-loader调用require加载css文件，需要css-loader
- modules是在css-loader上实现的

替换细节

- @import => require("-!../node_modules/css-loader/index.js!./global.css")
- 把 background-image: url('./avatar.jpeg’) 替换成 "background-image: url(" + require("./avatar.jpeg") + “)"

### css-loader转换

```js
exports = module.exports = require("../node_modules/css-loader/lib/css-base.js")(undefined); // 这里其实返回了一个数组。
// imports
exports.i(require("-!../node_modules/css-loader/index.js!./global.css"), ""); //对另一个CSS文件的依赖

// module
//想默认导出的数组中加入了一个数组，分别存了 `module.id` 和 css的内容
exports.push([module.id, "h1 {\n  color: #f00;\n}\n\n.avatar {\n  width: 100px;\n  height: 100px;\n  background-image: url(" + require("./avatar.jpeg") + ");\n  background-size: cover;\n}\n", ""]);

// exports
// 显然是 modules 模式的时候用的一个名字映射
exports.locals = {
    "avatar": "_2cO19opl9mOimp5NKYGn-L"
}
```

### css-loader原理

css-loader 的主要代码包含这两部分：

- processCss.js: 调用postcss对css源码进行解析，抽离出 url 和 import 这两种依赖
- loader.js: 调用 processCss，根据它已经分析出的 url 和 import 依赖关系，在对应的代码中替换成 require，并拼接成段最终的JS返回

## 参考

https://github.com/lihongxun945/diving-into-webpack/blob/master/3-style-loader-and-css-loader.md