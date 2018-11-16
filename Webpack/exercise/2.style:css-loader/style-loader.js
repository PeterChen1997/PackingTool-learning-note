module.exports.pitch = function (request) {
    let result = [
        'var content = require(' + loaderUtils.stringifyRequest(this, '!!', request) + ')', // get css
        'require(' + loaderUtils.stringifyRequest(this, '!', path.join(__dirname, "add-style.s")) + ')(content)', // 调用addStyle插入css
        'if(content.locals) module.exports = content.locals' // 如果发现css module 则导出
    ]
    return result.join(',')
}