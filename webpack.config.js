let path = require('path');
let webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './module.js',
    devtool: 'source-map',
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
    plugins: [
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({sourceMap: true})
    ]
}