'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src_client', 'app')

    ,entry: {
        index: './index.js'
    }
    ,output: {
        path: path.resolve(__dirname, 'build', 'src_client')
        ,filename: '[hash].[name].bundle.js'
        ,chunkFilename: '[hash].[id].bundle.js'
        //chunkFilename: "[id].bundle.js",
        ,publicPath: "/src_client/"
    }

    ,module: {
        loaders: [
            {
                test: /\.js$/
                ,include: path.resolve(__dirname,'src_client')
                ,exclude: [path.resolve(__dirname, "node_modules"), /_spec.js$/]
                ,loader: 'babel-loader?presets[]=es2015' // !ng-annotate-loader
            }
            ,{
                test: /\.scss/,
                loader: 'style!css!autoprefixer?browsers=last 2 version!sass!'
            }
            ,{
                test: /\.css$/
                ,loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions'
            }
            ,{
                test: /\.(eot|svg|ttf|woff|woff2)\w*/
                ,loader: 'file'
            }
            ,{
                test: /\.html$/
                ,loader: 'raw'
            }
        ]
        ,noParse: /angular\/angular.js/
    }


    ,plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
                ,drop_console: true
                , unsafe: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('[hash].common.bundle.js')
    ]
};
