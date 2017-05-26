// var gulp   = require( 'gulp' ),
//     server = require( 'gulp-develop-server' )
// 	jshint = require('gulp-jshint');
	
// gulp.task('lint', function() {
//   return gulp.src('app.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'));
// });
	
// 	// run server 
// gulp.task( 'server:start', function() {
//     server.listen( { path: './server.js' } );
// });
 
// // restart server if app.js changed 
// gulp.task( 'server:restart', function() {
//     gulp.watch( [ './server.js' ], server.restart );
// });

// gulp.task('default', ['lint','server:start','server:restart']);

//http://blog.carlosroso.com/setting-up-gulp-with-express-and-livereload/

var gulp = require('gulp');  
var nodemon = require('gulp-nodemon');  
var sass = require('gulp-ruby-sass');  
var autoprefixer = require('gulp-autoprefixer');  
var jshint = require('gulp-jshint');  
var livereload = require('gulp-livereload');  

gulp.task('scripts', function() {  
  return gulp.src('public/js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(livereload());
});

gulp.task('ejs',function(){  
    return gulp.src('views/**/*.ejs')
    .pipe(livereload());
});

gulp.task('watch', function() {  
    livereload.listen();
    gulp.watch('public/js/*.js', ['scripts']);
    gulp.watch('views/**/*.ejs', ['ejs']);
});

gulp.task('server',function(){  
    nodemon({
        'script': 'server.js',
        'ignore': 'client/*.js'
    });
});

gulp.task('serve', ['server','watch']); 