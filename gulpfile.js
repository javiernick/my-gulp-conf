var gulp = require('gulp');
var connect = require('gulp-connect-php');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');

//js files
var SRC_JS = "app/assets/js/*.js";
//css files
var SRC_CSS = "app/assets/css/*.css";
//php files in app folder and its subfolders
var SRC_PHP = "app/**/*.php";
//html files in app folder and its subfolders
var SRC_HTML = "app/**/*.php";

//first parameter is a name, let it will be a 'browserSync'
gulp.task('browserSync', function() {
  connect.server({}, function (){
    browserSync({

      //path to an index file for a wamp server
      proxy: '127.0.0.1/gulp-project/app/'
    });
  });
});

gulp.task('js', function () {

    //gulp.src will write files to a stream
    return gulp.src(SRC_JS)

        //pass written files through a jshint plugin what will check our JavaScript code for errors
        .pipe(jshint())

        //write in a console any errors if found
        .pipe(jshint.reporter("default"))

        //reload a browser to show changes
        .pipe(browserSync.reload({
          stream: true
        }));
});

//css files
gulp.task('css', function () {

    return gulp.src(SRC_CSS)
        .pipe(browserSync.reload({
          stream: true
        }));
});

//html files
gulp.task('html', function () {

    return gulp.src(SRC_HTML)
        .pipe(browserSync.reload({
          stream: true
        }));
});

//php files
gulp.task('php', function () {

    return gulp.src(SRC_PHP)
        .pipe(browserSync.reload({
          stream: true
        }));
});

gulp.task("watch", ['browserSync', 'js', 'css', 'php', 'html'], function() {

    gulp.watch(SRC_JS, ['js']);
    gulp.watch(SRC_CSS, ['css']);
    gulp.watch(SRC_PHP, ['php']);
    gulp.watch(SRC_HTML, ['html']);
});