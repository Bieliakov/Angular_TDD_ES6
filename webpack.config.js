'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: __dirname + '/src_client',

    entry: {
        app: './app.js'//,
        //app: './app',
        //searchResult: './SearchResult',
        //welcome: './welcome'

    },
    output: {
        path: __dirname + '/public',
        filename: 'app.js',//"[name].js",
        library: "app"
    },

    watch: NODE_ENV == 'development',

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
        loaders: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, "node_modules"),
                loader: 'babel?presets[]=es2015'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    }

};