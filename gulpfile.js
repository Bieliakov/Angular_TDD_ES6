var gulp = require('gulp');                 //  main gulp module
var webpack = require('webpack');
var config = require('./gulp.config.js');


var util = require('gulp-util');        //  Helps to write some logs out

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
    var webpackDevConfig = require("./webpack.config.dev.js");

    var compiler = webpack(webpackDevConfig);

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


gulp.task('test', function(callback) {
    var resolve = require('path').resolve;
    var webpackTestConfig = require('./webpack.config.test.js');
    var karma = require('karma');
    var Server = karma.Server;

    var compiler = webpack(webpackTestConfig);
    compiler.run(function(err, stats) {
        if (err) {
            gutil.log('webpack', err);
            return;
        }
        Server.start({
            configFile: resolve(__dirname, 'karma.conf.js')
        }, function(exitCode) {
            gutil.log('Karma has exited with ' + exitCode);
            process.exit(exitCode);
        });
    });

});

gulp.task("default", ["dev"]);
