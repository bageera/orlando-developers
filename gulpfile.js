// Gulp Dependenciens
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

// metalsmith dependencies
var metalsmith = require('metalsmith');
var templates = require('metalsmith-templates');
var gulpsmith = require('gulpsmith');
var markdown = require('metalsmith-markdown');

var handlebars = require('handlebars');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

//declade source directory for css
var srcDir = './src';
//declade target directory for where gulpp will place css files
var targetBuildDir = './build';
var templateDir = 'templates';
//create css task that will autoprefix css
//minify the css and place it in the target directory
gulp.task('css', function(){
	console.log("converting and minifying css");
	gulp.src(srcDir + '/**/*.css')
		.pipe(autoprefixer('last 5 version'))
		.pipe(minifycss())
		.pipe(gulp.dest(targetBuildDir))
});

//create watch task that will watch the src directory for changes
gulp.task('watch',function(){
	gulp.watch(srcDir + '/**/*.css', ['css']);
});

//deploy
gulp.task('deploy',['clean','css'],function(){

	gulp.src(srcDir + '/**/*.md')
	.pipe(markdown())
	.pipe(rename('index.html'))
	.pipe(gulp.dest(targetBuildDir))
			
});


gulp.task('clean',function(){
	console.log("Clean all files in build folder");
	gulp.src(targetBuildDir + "/**.*")
	.pipe(clean());	
});


gulp.task('mtest',function(){
	gulp.src(srcDir + '/**/*.md')
	.pipe(gulpsmith()
		.use( markdown({
			gfm: true,
			smartypants: true
			}))
		.use( templates({
			engine:	'handlebars',
			directory: '/templates'
			}))
	)
	.pipe(gulp.dest(targetBuildDir))
});


//default tasks that will run when gulp is called
gulp.task('default', ['css','watch']);
