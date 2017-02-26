const gulp = require('gulp');
const source = require('vinyl-source-stream');
const vinylBuffer = require('vinyl-buffer');
const watchify = require('watchify');
const browserify = require('browserify');
const plugins = require('gulp-load-plugins')();
const nodemon = require('nodemon');

const bundler = watchify(browserify('./public/js/index.js', watchify.args)
  .transform('babelify', {presets: ['es2015']}));
bundler.on('update', bundle);
bundler.on('log', plugins.util.log);

function bundle() {
  return bundler.bundle()
    // log errors
    .on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'))
    .pipe(source('index.js'))
    // build sourcemaps
    .pipe(vinylBuffer())
    .pipe(plugins.sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(plugins.sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./public/dest'))
    .pipe(plugins.livereload());
}

gulp.task('scss:lint', () => {
  gulp.src('./public/scss/**/*.scss')
    .pipe(plugins.sassLint())
    .pipe(plugins.sassLint.format())
    .pipe(plugins.sassLint.failOnError());
});

gulp.task('scss:compileDev', () => {
  gulp.src('./public/scss/**/*.scss')
    // Build sourcemaps
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({errLogToConsole: true}))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('./public/dest/css'))
    .pipe(plugins.livereload());
});

gulp.task('scss:compile', ['fonts:copy'], () => {
  gulp.src('./public/scss/**/*.scss')
    .pipe(plugins.sass({errLogToConsole: true}))
    .pipe(gulp.dest('./public/dest/css'));
});

gulp.task('css:minify', ['scss:compile'], () => {
  gulp.src('./public/dest/css/*.css')
    .pipe(plugins.cleanCss())
    .pipe(gulp.dest('./public/dest/css'));
});

gulp.task('js:develop', () => {
  bundle();
});

gulp.task('js:compress', () => {
  const bundleStream = browserify('./public/js/index.js')
    .transform('babelify', {presets: ['es2015']})
    .bundle();

  bundleStream
    .pipe(source('index.js'))
    .pipe(plugins.streamify(plugins.uglify()))
    .pipe(vinylBuffer())
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('./public/dest'));
});

gulp.task('scss:develop', ['scss:lint', 'scss:compileDev']);

gulp.task('fonts:copy', () => {
  gulp.src(['./node_modules/bootstrap-sass/assets/fonts/bootstrap/*'])
    .pipe(gulp.dest('./public/dest/fonts'));
});

gulp.task('images:copy', () => {
  gulp.src(['./public/images/**/**'])
    .pipe(gulp.dest('./public/dest/images'));
});

gulp.task('develop', () => {
  plugins.livereload.listen();

  nodemon({
    script: 'bin/www',
    stdout: true
  }).on('readable', () => {
    this.stdout.on('data', chunk => {
      if (/^listening/.test(chunk)) {
        plugins.livereload.reload();
      }
      process.stdout.write(chunk);
    });
  });

  gulp.watch('public/images/**/**', ['images:copy']);

  gulp.watch('public/**/*.scss', ['scss:develop']);

  gulp.watch('public/**/!(dest)/**/*.+(jsx|js)', ['js:develop']);
});

gulp.task('build', [
  'fonts:copy',
  'images:copy',
  'css:minify',
  'js:compress'
]);
