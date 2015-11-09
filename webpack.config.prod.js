'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    ]


};