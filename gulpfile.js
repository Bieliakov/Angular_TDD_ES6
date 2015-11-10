var gulp = require('gulp');                 //  main gulp module
var args = require('yargs').argv;           //  tool for getting the arguments (file paths) in a stream
//var connect = require('gulp-connect');      //  allow livereload our files in webbrowser
var webpack = require('webpack');
var config = require('./gulp.config.js');

// unit testing
//var jasminePhantomJs = require('gulp-jasmine2-phantomjs');
var jasmine = require('gulp-jasmine');
var reporters = require('jasmine-reporters');
//var jasmine = require('gulp-jasmine-phantom');
//var jasmineBrowser = require('gulp-jasmine-browser');

var util = require('gulp-util');        //  Helps to write some logs out
var gulpprint = require('gulp-print');  //  For printing all the files that gulp is 'touching' in a process
var gulpif = require('gulp-if');        //  Plugin for adding 'if' condition to a stream (process)


gulp.task('copy-html', function () {
    return gulp
        .src(config.allhtml)
        .pipe(gulp.dest('./public'))

});

gulp.task('release', ['copy-html'], function(){

    var webpackReleaseConfig = require('./webpack.config.release.js');
    webpack(webpackReleaseConfig, function(err, stats) {
        if (err) {
            throw new util.PluginError('webpack', err);
        }
    });


});

gulp.task('dev', function(callback) {
    var WebpackDevServer = require("webpack-dev-server");
    var webpackConfig = require("./webpack.config.dev.js");

    var compiler = webpack(webpackConfig);

    // Start a webpack-dev-server
    new WebpackDevServer(compiler, {
        //historyApiFallback: true
        publicPath: "/src_client/js/"
        //contentBase: '/'

    }).listen(8080, "localhost", function(err) {
        if(err) throw new util.PluginError("dev", err);
        // Server listening
        util.log("[dev]", "http://localhost:8080/public/index.html");

        // keep the server alive or continue?
        // callback();
    });
});


gulp.task('test', function(){
    // Test JS
    return gulp.src(config.allJSspecs)  //'test/*.html' ///*, 'specs/spec/lib/*.js'
        .pipe(gulpif(args.verbose, gulpprint()))
        .pipe(jasmine({
            reporter: new reporters.TerminalReporter()
        })); //jasminePhantomJs()
});


//gulp.task('serverGulp', function(){
//    connect.server({
//        port: 8080,                                 // Server started at http://localhost:8080
//        root: 'public',                              // place where our main files are
//        livereload: true                            // livereload for our server
//    })
//});

gulp.task("default", ["dev"]);
