module.exports = function (content) {
    let style = document.createElement("style")
    style.innerHTML = content
    document.head.appendChild(style)
}