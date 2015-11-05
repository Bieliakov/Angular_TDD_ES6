var gulp = require('gulp');                 //  main gulp module
var args = require('yargs').argv;           //  tool for getting the arguments (file paths) in a stream
//var connect = require('gulp-connect');      //  allow livereload our files in webbrowser
var url = require('url');                   //  url tool
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

// unit testing
//var jasminePhantomJs = require('gulp-jasmine2-phantomjs');
////var jasmine = require('gulp-jasmine');
////var reporters = require('jasmine-reporters');
//var jasmine = require('gulp-jasmine-phantom');
//var jasmineBrowser = require('gulp-jasmine-browser');

var util = require('gulp-util');        //  Helps to write some logs out
//var gulpprint = require('gulp-print');  //  For printing all the files that gulp is 'touching' in a process
//var gulpif = require('gulp-if');        //  Plugin for adding 'if' condition to a stream (process)


gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack(webpackConfig);

    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(8080, "localhost", function(err) {
        if(err) throw new util.PluginError("webpack-dev-server", err);
        // Server listening
        util.log("[webpack-dev-server]", "http://localhost:8080/build/index.html");

        // keep the server alive or continue?
        // callback();
    });
});


//gulp.task('test', function(){
//    // Test JS
//    return gulp.src(['specs/js/**/*_spec.js'])  //'test/*.html' ///*, 'specs/spec/lib/*.js'
//        .pipe(gulpif(args.verbose, gulpprint()))
//        .pipe(jasmine({
//            reporter: new reporters.TerminalReporter()
//        })); //jasminePhantomJs()
//});


//gulp.task('serverGulp', function(){
//    connect.server({
//        port: 8080,                                 // Server started at http://localhost:8080
//        root: 'build',                              // place where our main files are
//        livereload: true                            // livereload for our server
//    })
//});

gulp.task("default", ["webpack-dev-server"]);
