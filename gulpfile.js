/**
 * Front-end / web performance optimisation starter kit based on a simple Gulp 4 Starter Kit for modern web development.
 *
 * @package @jr-cologne/create-gulp-starter-kit
 * @author JR Cologne <kontakt@jr-cologne.de>
 * @copyright 2020 JR Cologne
 * @license https://github.com/jr-cologne/gulp-starter-kit/blob/master/LICENSE MIT
 * @version v0.11.0-beta
 * @link https://github.com/jr-cologne/gulp-starter-kit GitHub Repository
 * @link https://www.npmjs.com/package/@jr-cologne/create-gulp-starter-kit npm package site
 *
 * ________________________________________________________________________________
 *
 * gulpfile.js
 *
 * The gulp configuration file.
 *
 */

const gulp                      = require('gulp'),
      del                       = require('del'),
      plumber                   = require('gulp-plumber'),
      autoprefixer              = require('gulp-autoprefixer'),
      minifyCss                 = require('gulp-clean-css'),
      uglify                    = require('gulp-uglify'),
      browserSync               = require('browser-sync').create(),
      htmlmin                   = require('gulp-htmlmin'),
      critical                  = require('critical'),
      sass                      = require('gulp-sass')(require('sass')),
      purgecss                  = require('gulp-purgecss'),

      src_folder                = './src/',
      src_assets_folder         = src_folder + 'assets/',
      dist_folder               = './dist/',
      dist_assets_folder        = dist_folder + 'assets/';

gulp.task('clear', () => del([dist_folder]));

gulp.task('html', () => {
  return gulp.src([src_folder + '**/*.html'], {
    base: src_folder,
    since: gulp.lastRun('html')
  })
    .pipe(gulp.dest(dist_folder))
    .pipe(browserSync.stream());
});

gulp.task('html-minified', () => {
  return gulp.src(src_folder + '*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(dist_folder))
});

gulp.task('sass', (cb) => {
  return gulp.src([
    src_assets_folder + 'sass/**/*.sass',
    src_assets_folder + 'scss/**/*.scss'
  ])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dist_assets_folder + 'css'));

  cb();
});

gulp.task('css-purge', () => {
  return gulp.src(dist_assets_folder + 'css/**/*.css')
    .pipe(purgecss({
      content: [dist_folder + '*.html'],
      safelist: [/--visible$/, /--loading$/, /^mfp-/]
    }))
    .pipe(gulp.dest(dist_assets_folder + 'css'))
})

gulp.task('css-minify', () => {
  return gulp.src(dist_assets_folder + 'css/**/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest(dist_assets_folder + 'css'))
});

gulp.task('js-copy', () => {
  return gulp.src([src_assets_folder + 'js/homework/**/*'], { since: gulp.lastRun('js-copy') })
    .pipe(gulp.dest(dist_assets_folder + 'js/homework'))
    .pipe(browserSync.stream());
});

gulp.task('js-minified', () => {
  return gulp.src([
    src_assets_folder + 'js/homework/*.+(mjs|js)',
    src_assets_folder + 'js/homework/vendor/*.+(mjs|js)'
  ], { since: gulp.lastRun('js-minified'), base: src_assets_folder + 'js/homework' })
    .pipe(uglify())
    .pipe(gulp.dest(dist_assets_folder + 'js/homework'))
    .pipe(browserSync.stream());
});

gulp.task('images', () => {
  return gulp.src([src_assets_folder + 'images/**/*.+(png|jpg|jpeg|webp|gif|svg|ico)'], { since: gulp.lastRun('images') })
    .pipe(plumber())
    .pipe(gulp.dest(dist_assets_folder + 'images'))
    .pipe(browserSync.stream());
});

gulp.task('fonts', () => {
  return gulp.src([src_assets_folder + 'fonts/**/*'], { since: gulp.lastRun('fonts') })
    .pipe(gulp.dest(dist_assets_folder + 'fonts'))
    .pipe(browserSync.stream());
});

gulp.task('videos', () => {
  return gulp.src([src_assets_folder + 'videos/**/*'], { since: gulp.lastRun('videos') })
    .pipe(gulp.dest(dist_assets_folder + 'videos'))
    .pipe(browserSync.stream());
});

gulp.task('extra-files', () => {
  return gulp.src([src_folder + '*.txt', src_folder + '*.json', src_folder + '*.ico'], { since: gulp.lastRun('extra-files') })
    .pipe(gulp.dest(dist_folder))
    .pipe(browserSync.stream());
});

gulp.task('generate-critical-css', (cb) => {
  critical.generate({
    inline: true,
    base: dist_folder,
    src: 'homework-homepage.html',
    target: {
      html: 'homework-homepage-critical.html',
      css: 'critical.css',
    },
    width: 1300,
    height: 900,
  });
  cb();
});

gulp.task(
  'build',
  gulp.series(
    'clear',
    'html-minified',
    'sass',
    'js-minified',
    'fonts',
    'videos',
    'extra-files',
    'images',
    'css-purge',
    'css-minify',
    /*'generate-critical-css',*/
  )
);

gulp.task('dev', gulp.series(
  'html',
  'sass',
  'fonts',
  'videos',
  'extra-files',
  'js-copy'
));

gulp.task('serve', () => {
  return browserSync.init({
    server: {
      baseDir: ['dist']
    },
    port: 3000,
    open: false
  });
});

gulp.task('watch', () => {
  const watchImages = [
    src_assets_folder + 'images/**/*.+(png|jpg|jpeg|webp|gif|svg|ico)'
  ];

  const watch = [
    src_folder + '**/*.html',
    src_assets_folder + 'sass/**/*.sass',
    src_assets_folder + 'scss/**/*.scss',
    src_assets_folder + 'js/**/*.js',
    src_assets_folder + 'js/**/*.mjs',
    src_assets_folder + 'fonts/**/*',
    src_assets_folder + 'videos/**/*',
    src_folder + '*.txt',
    src_folder + '*.json',
    src_folder + '*.ico'
  ];

  gulp.watch(watch, gulp.series('dev')).on('change', browserSync.reload);
  gulp.watch(watchImages, gulp.series('images')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));
