let path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './public'
    },
    output: {
        filename: 'player.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: []
}