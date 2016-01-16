'use-strict';

var gulp = require('gulp');

// require other packages
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var nano = require('gulp-cssnano');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var scriptInput = [
	'./src/js/Gdz.Base.js',
	'./src/js/modules/*.js',
	'./src/js/Gdz.Load.js',
	'./src/js/Gdz.Ready.js'
];

var sassInput = [
	'./src/sass/*.scss'
];

var sassOutput = './dist/css/';
var scriptOutput = './dist/js/';

var sassOpts = {
	errLogToConsole: true,
	outputStyle: 'expanded',
	// indentType: 'tab',
	includePaths: [
		'./src/sass'
	]
};

var autoprefixerOpts = {
	browsers: ['> 2% in GB', 'IE >= 8']
};


// autoprefix debug info
gulp.task('autoprefix-debug', function() {
	var info = autoprefixer( autoprefixerOpts ).info();
	console.log( info );
});

// scripts task
gulp.task('scripts', function() {
	return gulp
		.src( scriptInput )
		.pipe(concat('app.js'))
		.pipe(gulp.dest( scriptOutput ))
		.pipe(uglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest( scriptOutput ));
});

// dev styles task - unminified
gulp.task('styles-dev', function() {
	return gulp
		.src( sassInput )
		.pipe(sourcemaps.init())
		.pipe(sass( sassOpts ).on('error', sass.logError))
		.pipe(sourcemaps.write('../maps'))
		.pipe(gulp.dest( sassOutput ));
});

// prod styles task - minified
gulp.task('styles-prod', function() {
	return gulp
		.src( sassInput )
		.pipe(sourcemaps.init())
		.pipe(sass( sassOpts ).on('error', sass.logError))
		.pipe(postcss([ autoprefixer( autoprefixerOpts ) ]))
		.pipe(nano())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('../maps'))
		.pipe(gulp.dest( sassOutput ));
});

// watch task
gulp.task('watch', function() {
	gulp.watch([
		'./src/js/*.js',
		'./src/js/**/*.js'
	], ['scripts']);
	gulp.watch([
		'./src/sass/*.scss',
		'./src/sass/**/*.scss'
	], ['styles-dev']);
});

gulp.task('default', ['scripts', 'styles-dev', 'styles-prod', 'watch']);
