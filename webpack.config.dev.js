'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src_client'),

    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve(__dirname, 'public', 'src_client'),
        filename: "[name].bundle.js",
        library: "[name]",
        //chunkFilename: "[id].bundle.js",
        publicPath: "src_client/"
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: "cheap-module-inline-source-map",

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify('Some var'),
            USER: '"hello"'
        })
        //, new webpack.optimize.CommonsChunkPlugin('common.bundle.js')
        //, new webpack.optimize.commonsChunkPlugin({
        //    name: 'common'
        //})
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname,'src_client'),
                exclude: path.resolve(__dirname, "node_modules"),
                loader: 'babel-loader?presets[]=es2015'
            }
            ,{
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                loader: 'file'
            },
            {
                test: /\.html$/,
                loader: 'raw'//raw
            }
        ],
        noParse: /angular\/angular.js/
    }

    //,resolve: {
    //    root: [
    //        path.resolve(__dirname),
    //        path.resolve(__dirname, 'src_client/'),
    //        path.resolve(__dirname, 'src_client/search/')
    //    ]
    //}
    // ,resolve: {
    //    modulesDirectories: ['node_modules'],
    //    extensions: ['', '.js']
    //}

    //,resolveLoader: {
    //    modulesDirectories: ['node_modules'],
    //    moduleTemplates: ['*-loader', '*'],
    //    extensions: ['', '.js']
    //}
    //, devServer: {
    //    host: 'localhost',
    //    port: 8080
    //}
};