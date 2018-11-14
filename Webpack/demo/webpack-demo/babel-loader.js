const babel = require('babel-core')

// this.callback(
//     err: Error | null,
//     content: string | Buffer,
//     sourceMap?: SourceMap,
//     meta?: any
//   );

module.exports = function (source) {
    let babelOptions = {
        presets: ['env']
    }
    let result = babel.transform(source, babelOptions)

    this.callback(null, result.code, result.map)
}