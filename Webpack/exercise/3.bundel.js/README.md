# bundle.js内容分析

## 示例代码

a.js

```js
import { log } from './b.js'
log('hello')
```

b.js

```js
export const log = function (m) {
  console.log(m)
}

export const error = function (m) {
  console.error(m)
}
```

## 编译后代码分析

这里没有启用babel，减少代码分析的干扰

### 自执行函数

```js
"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./code/b.js
const log = function (m) {
    console.log(m)
  }
  
  const error = function (m) {
    console.error(m)
  }
// CONCATENATED MODULE: ./code/a.js

log('hello')

/***/ })
/******/ ]);
```

我们可以看到的是，整个代码是一个自执行的函数，其中这个函数接收的是一个数组，而数组中每一项都是我们的一个模块，这里我们有两个模块。不过这个模块的代码都是被一个函数包裹起来的

这个自执行函数，大概是这样的

```js
(function (modules) {})([module0, module1])
```

### webpack工具函数

来看下自制行函数的函数体，把关键部分代码缩写后，得出

```js
(function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {}
    // Load entry module and return exports
    return __webpack_require__(__webpack_require__.s = 0);
})
```

函数主要包含三部分内容

- 声明 installedModules 作为缓存对象，避免重复import
- 定义了__webpack_require__相关的函数
- 最后调用并返回__webpack_require__（\__webpack_require__.s = 0），模块0就是入口文件

\__webpack_require__通过moduleId，返回模块内容

```js
function __webpack_require__(moduleId) {
        // 看看有没有缓存，有的话就直接用了
        // Check if module is in cache
        if(installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // Create a new module (and put it into the cache)
        // 如果没有的话，那么就先创建一个空的缓存
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };

        // Execute the module function
        // 然后执行这个模块的代码，参数会传入模块系统相关的几个函数，把拿到的结果放到缓存中
        // 通过把 `module.exports`  传给模块，让他自己把自己放到缓存中。
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        // Flag the module as loaded
        module.l = true;

        // Return the exports of the module
        // 最后得到了模块导出的内容，返回就可以了
        return module.exports;
    }
```

## webpack对依赖模块的处理流程

![imgs](https://github.com/lihongxun945/diving-into-webpack/blob/master/images/dep2.png)