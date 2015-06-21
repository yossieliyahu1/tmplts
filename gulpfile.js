'use strict';

var fs = require('fs');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var bowerResolve = require('bower-resolve');
var nodeResolve = require('resolve');
var gulpif = require('gulp-if');

var production = (process.env.NODE_ENV === 'production');

gulp.task('default', ['build-vendor', 'build-app']);

gulp.task('build-vendor', function () {

  // this task will go through ./bower.json and
  // uses bower-resolve to resolve its full path.
  // the full path will then be added to the bundle using require()

  var b = browserify({
    // generate source maps in non-production environment
    debug: !production
  });

  // get all bower components ids and use 'bower-resolve' to resolve
  // the ids to their full path, which we need for require()
  getBowerPackageIds().forEach(function (id) {

    var resolvedPath = bowerResolve.fastReadSync(id);

    b.require(resolvedPath, {

      // exposes the package id, so that we can require() from our code.
      // for eg:
      // require('./vendor/angular/angular.js', {expose: 'angular'}) enables require('angular');
      // for more information: https://github.com/substack/node-browserify#brequirefile-opts
      expose: id

    });
  });

  // do the similar thing, but for npm-managed modules.
  // resolve path using 'resolve' module
  getNPMPackageIds().forEach(function (id) {
    b.require(nodeResolve.sync(id), { expose: id });
  });

  return b.bundle()
         .pipe(source('vendor.js')) 
         .pipe(buffer())
         .pipe(gulpif(production,uglify()))        
         .pipe(gulp.dest('./dist/js'));

});

gulp.task('build-app', function () {

  var b = browserify({
    // generate source maps in non-production environment
     entries: './src/js/main.js',
     debug: !production
  });

  // mark vendor libraries defined in bower.json as an external library,
  // so that it does not get bundled with app.js.
  // instead, we will load vendor libraries from vendor.js bundle
  getBowerPackageIds().forEach(function (lib) {
    b.external(lib);
  });


  // do the similar thing, but for npm-managed modules.
  // resolve path using 'resolve' module
  getNPMPackageIds().forEach(function (id) {
    b.external(id);
  });

  return b.bundle()
        
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulpif(!production,sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(production,uglify()))
        .on('error', gutil.log)
        .pipe(gulpif(!production,sourcemaps.write('./')))

        .pipe(gulp.dest('./dist/js'));


});


gulp.task("watch-js",function(){

    return gulp.watch(['./src/js/**/*','./src/js/!(vendor)/**/*.js'],['build-app'])

});


gulp.task("html",function(){

    return gulp.src("./src/index.html")
          .pipe(gulp.dest("./dist"));

});


gulp.task("build",["build-vendor","build-app","html"]);


gulp.task("default",["watch-js"]);

/**
 * Helper function(s)
 */

function getBowerPackageIds() {
  // read bower.json and get dependencies' package ids
  var bowerManifest = {};
  try {
    bowerManifest = require('./bower.json');
  } catch (e) {
    // does not have a bower.json manifest
  }
  return Object.keys(bowerManifest.dependencies) || [];

}


function getNPMPackageIds() {
  // read package.json and get dependencies' package ids
  var packageManifest = {};
  try {
    packageManifest = require('./package.json');
  } catch (e) {
    // does not have a package.json manifest
  }
  return Object.keys(packageManifest.dependencies) || [];

}