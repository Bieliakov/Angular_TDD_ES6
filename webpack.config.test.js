'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        index: './src_client/test/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'src_client', 'test'),
        filename: 'test.bundle.js'
    },
    //devtool: "cheap-module-inline-source-map",

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, "node_modules"),
                loader: 'babel-loader?presets[]=es2015'
            }
            ,{
                test: /\.html$/,
                loader: 'raw'//raw
            }
        ],
        noParse: /angular\/angular.js/
    }
    //, resolve: {
    //    root: [
    //        path.resolve(__dirname),
    //        path.resolve(__dirname, 'src_client'),
    //        path.resolve(__dirname, 'test')
    //    ],
    //        extensions: ['', '.js', '.json']
    //}
};