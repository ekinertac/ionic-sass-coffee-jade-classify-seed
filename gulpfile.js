var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jade = require('gulp-jade');
var coffee = require('gulp-coffee');
var ngClassify = require('gulp-ng-classify');

var paths = {
    sass  : ['./dev/scss/**/*.scss'],
    jade  : ['./dev/jade/**/*.jade'],
    coffee: ['./dev/coffee/**/*.coffee']
};

gulp.task('default', ['sass', 'jade', 'coffee']);

gulp.task('sass', function (done) {
    gulp.src(paths.sass)
        .pipe(sass())
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('jade', function (done) {
    gulp.src(paths.jade)
        .pipe(jade())
        .pipe(gulp.dest('./www/templates/'));

    gulp.src('./dev/jade/index.jade')
        .pipe(jade())
        .pipe(gulp.dest('./www/'))
        .on('end', done);
});

gulp.task('coffee', function (done) {
    gulp.src(paths.coffee)
        .pipe(ngClassify(function(){
            return {appName: 'app'};
        }))

        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(concat('application.js'))
        .pipe(gulp.dest('./www/js'))
        .on('end', done)
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.coffee, ['coffee']);
    gulp.watch(paths.jade, ['jade']);
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
