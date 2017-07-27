var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

  browserSync.init({
      server: "./static"
  });

  gulp.watch("src/scss/*.scss", ['sass']);
  gulp.watch("static/*.html").on('change', browserSync.reload);

  // protip: stop old version of gulp watch from running when you modify the gulpfile
  // gulp.watch("gulpfile.js").on("change", () => process.exit(0));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src("src/scss/*.scss")
    .pipe(sass({ outputStyle: 'compressed' }).on('error', function(err) {
      console.error(err.message);
      browserSync.notify(err.message, 3000); // Display error in the browser
      this.emit('end'); // Prevent gulp from catching the error and exiting the watch process
    }))
    .pipe(autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}))
    .pipe(gulp.dest("static/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);