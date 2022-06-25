const gulp        = require('gulp');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS    = require('gulp-clean-css');
const pug         = require('gulp-pug');
const browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
function serve() {
  browserSync.init({
    server: './docs',
    browser: 'safari',
  })

  gulp.watch('app/styles/**/*.scss', style)
  gulp.watch('app/*.pug', html)
  gulp.watch('docs/*.html').on('change', browserSync.reload)
}

// Compile pug into html & auto-inject into browsers
function html() {
  return gulp.src('app/*.pug')
    .pipe(pug({
      locals: {},
      pretty: true,
    }))
    .pipe(gulp.dest('docs'))
};

// Compile sass into CSS & auto-inject into browsers
function style() {
  return gulp.src('app/styles/*.scss')
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('docs/assets'))
    .pipe(browserSync.stream());
};

exports.html = html
exports.style = style
exports.serve = serve
exports.default = gulp.series(html, style, serve)