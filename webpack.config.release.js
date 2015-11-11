'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src_client')

    ,entry: {
        app: './app.js'
    }
    ,output: {
        path: path.resolve(__dirname, 'public', 'js')
        ,filename: "[name].bundle.js"
        ,library: "[name]"
        //chunkFilename: "[id].bundle.js",
        ,publicPath: "/"
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
        })
    ]
};
