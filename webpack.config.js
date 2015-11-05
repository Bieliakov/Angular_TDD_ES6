'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    context: __dirname + '/src_client',

    entry: {
        home: './home',
        about: './about'
    },
    output: {
        path: __dirname + '/build',
        filename: "[name].js",
        library: "[name]"
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV  == 'development' ? "cheap-module-inline-source-map" : null,
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            USER: '"hello"'
        })
    ],

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel?presets[]=es2015',
            exclude: /node_modules/
        }]
    }

};