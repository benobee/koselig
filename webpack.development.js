const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

const config = merge(common, {
    mode: 'development',
    entry: ['./index.jsx'],
    devtool: 'inline-source-map',
    module: {
        rules: [{ // @rule: LESS
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        }, ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public')
    },
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: "bundle.js"
    },
    externals: ['mdns']
});

module.exports = config;