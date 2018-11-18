# webpack调试分析

## lib/webpack.js

new Webpack的时候会创建一个complier，并且会根据我们的配置，把插件都注册好

### compiler

```js
const webpack = (options, callback) => {
    // ...

        complier = new Complier()
        complier.context = options.context
        complier.options = options
        new NodeEnvironmentPlugin().apply(complier)
        if (options.plugins && Array.isArray(options.plugins)) {
            compiler.apply.apply(compiler, options.plugins)
        }
        compiler.applyPlugins("environment")
        compiler.applyPlugins("after-environment")
        compiler.options = new WebpackOptionsApply().process(options, compiler)

    // ...
    return compiler
}
```

### WebpackOptionsApply

Webapck Options Apply会根据配置注册对应的内部插件

首先会注册一个处理Entry的插件

```js
compiler.apply(new EntryOptionPlugin()) // 注册回掉
compiler.applyPluginBailResult("entry-option", options.context, options.entry) // 触发
```

这里只是注册了插件，最终会在make阶段吧entry解析成一个module

接下来会注册一大堆的内部插件

```js
compiler.apply(
    new CompatibilityPlugin(),
    new HarmonyModulesPlugin(options.module),
    new AMDPlugin(options.module, options.amd || {}),
    new CommonJsPlugin(options.module),
    new LoaderPlugin(),
    // 省略
);

compiler.apply(
    new EnsureChunkConditionsPlugin(),
    new RemoveParentModulesPlugin(),
    new RemoveEmptyChunksPlugin(),
    // 省略
);
```

### bin/webpack.js

又回到 bin/webpack.js 这里，如果没有 watch 模式的话，直接调用 compiler.run

### compiler

编译主要有下面几个生命周期

1. before-run
1. run
1. before-compile
1. compile
1. this-compilation
1. compilation 这里进行一些代码编译的准备工作
1. make 这里进行代码编译
1. after-compile 这里会根据编译结果 合并出我们最终生成的文件名和文件内容

## webpack流程

1. 根据我们的webpack配置注册号对应的插件
1. 调用 compile.run 进入编译阶段，
1. 在编译的第一阶段是 compilation，他会注册好不同类型的module对应的 factory，不然后面碰到了就不知道如何处理了
1. 进入 make 阶段，会从 entry 开始进行两步操作：
1. 第一步是调用 loaders 对模块的原始代码进行编译，转换成标准的JS代码
1. 第二步是调用 acorn 对JS代码进行语法分析，然后收集其中的依赖关系。每个模块都会记录自己的依赖关系，从而形成一颗关系树
1. 最后调用 compilation.seal 进入 render 阶段，根据之前收集的依赖，决定生成多少文件，每个文件的内容是什么