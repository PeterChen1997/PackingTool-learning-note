const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './code/a.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
    ],
    optimization:{
        minimize: false, // <---- disables uglify.
        // minimizer: [new UglifyJsPlugin()] if you want to customize it.
    }
}