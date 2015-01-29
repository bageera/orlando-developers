var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

//declade source directory for css
var srcDir = './src';
//declade target directory for where gulpp will place css files
var targetCSSDir = './build';

//create css task that will autoprefix css
//minify the css and place it in the target directory
gulp.task('css', function(){
	gulp.src(srcDir + '/**/*.css')
		.pipe(autoprefixer('last 5 version'))
		.pipe(minifycss())
		.pipe(gulp.dest(targetCSSDir))
});

//create watch task that will watch the src directory for changes
gulp.task('watch',function(){
	gulp.watch(srcDir + '/**/*.css', ['css']);
});

//default tasks that will run when gulp is called
gulp.task('default', ['css','watch']);
