var config = require('./gulpfile.config.js'),
gulp = require('gulp'),
cleancss = require('gulp-clean-css'),
concat = require('gulp-concat'),
imagemin = require('gulp-imagemin'),
inject = require('gulp-inject'),
less = require('gulp-less'),
ngannotate = require('gulp-ng-annotate'),
ngConstant = require('gulp-ng-constant'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
runSequence = require('run-sequence'),
sourcemaps = require('gulp-sourcemaps'),
del = require('del'),
rev = require('gulp-rev'),
livereload = require('gulp-livereload'),
htmlreplace = require('gulp-html-replace'),
argv = require('yargs').argv;

// Initialize config based on specified environment.
// To specify an environment, add --environment_name behind every used task. Ex: gulp styles --staging
if (argv.production) {
  var selectedConfig = config.production;
} else if (argv.staging) {
  var selectedConfig = config.staging;
} else if (argv.test) {
  var selectedConfig = config.test;
} else if (argv.sandbox) {
  var selectedConfig = config.sandbox;
} else {
  var selectedConfig = config.development;
}

// Default gulp task
gulp.task('default', ['development']);

// Build application in local environment
gulp.task('local', function(callback) {
  selectedConfig = config.development;
  runSequence('fonts', 'build-app-css', 'images', 'favicon', 'env', 'index', callback);
});


// Build application in development environment
gulp.task('development', function(callback) {
  selectedConfig = config.development;
  runSequence('fonts', 'build-app-css', 'images', 'favicon', 'env', 'index', 'remove-livereload', callback);
});

// Build application in staging environment
gulp.task('staging', function(callback) {
  selectedConfig = config.staging;
  runSequence('delete', 'delete-dist', 'fonts', 'build-app-css', 'build-css', 'images', 'favicon', 'env', 'build-js', 'index', 'html', 'remove-livereload', callback);
})

// Build application in test environment
gulp.task('test', function(callback) {
  selectedConfig = config.test;
  runSequence('delete', 'delete-dist', 'fonts', 'build-app-css', 'build-css', 'images', 'favicon', 'env', 'build-js', 'index', 'html', 'remove-livereload', callback);
})

// Build application in sandbox environment
gulp.task('sandbox', function(callback) {
  selectedConfig = config.sandbox;
  runSequence('delete', 'delete-dist', 'fonts', 'build-app-css', 'build-css', 'images', 'favicon', 'env', 'build-js', 'index', 'html', 'remove-livereload', callback);
})

// Build application in production environment
gulp.task('production', function(callback) {
  selectedConfig = config.production;
  runSequence('delete', 'delete-dist', 'fonts', 'build-app-css', 'build-css', 'images', 'favicon', 'env', 'build-js', 'index', 'html', 'remove-livereload', callback);
})

// Concatenated all vendor css and app to a single file app.min.css
gulp.task('build-css', function() {
  return gulp.src(config.development.css)
  .pipe(concat('app.css'))
  .pipe(cleancss())
  .pipe(rev())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(selectedConfig.ENV.name + '/dist/css'))
});

// Concatenated all css/less assets into a single file app.css with sourcemaps
gulp.task('build-app-css', function() {
  return gulp.src('development/assets/less/app.less')
  .pipe(sourcemaps.init())
  .pipe(less())
  .pipe(sourcemaps.write())
  .pipe(rename('app.css'))
  .pipe(gulp.dest('development/dist/css'))
  .pipe(livereload());
})

// Concatenated all js assets and minify into a single file app.min.js
gulp.task('build-js', function() {
  return gulp.src(config.development.js)
  .pipe(concat('app.js'))
  .pipe(ngannotate())
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(rename({basename: selectedConfig.ENV.appName, suffix: '.min'}))
  .pipe(gulp.dest(selectedConfig.ENV.name + '/dist/js'))
});

// Copy all favicon assets into certain destination folder based on specified environment
gulp.task('favicon', function() {
  return gulp.src('development/assets/favicon/*')
  .pipe(gulp.dest(selectedConfig.ENV.name + '/dist/favicon'));
});

// Copy all image assets into certain destination folder based on specified environment
gulp.task('images', function() {
  return gulp.src('development/assets/images/*')
  .pipe(gulp.dest(selectedConfig.ENV.name + '/dist/images'))
  .pipe(livereload());
});

// Copy all fonts assets into certain destination folder based on specified environment
gulp.task('fonts', function() {
  return gulp.src(['development/assets/fonts/*'])
  .pipe(gulp.dest(selectedConfig.ENV.name + '/dist/fonts'));
})

// Injecting all css and js source into index.html based on specified index template in assets/templates/index.tpl.html
gulp.task('index', function() {
  return gulp.src('./development/assets/templates/index.tpl.html')
  .pipe(inject(gulp.src(selectedConfig.css.concat(selectedConfig.js), {read: false}), {ignorePath: selectedConfig.ENV.name, addPrefix: selectedConfig.ENV.baseUrl}))
  .pipe(rename('index.html'))
  .pipe(gulp.dest(selectedConfig.ENV.name))
  .pipe(livereload());
})

// Copy all html assets into certain destination folder based on specified environment
gulp.task('html', function() {
  return gulp.src(['development/application/**/*.html'])
  .pipe(gulp.dest(selectedConfig.ENV.name + '/application/'));
})

// Create app.env.js based on specified config template in assets/templates/config.tpl.ejs
gulp.task('env', function() {
  return gulp.src('')
  .pipe(ngConstant({
    name: 'app.env',
    constants: {
      ENV: selectedConfig.ENV
    },
    templatePath: 'development/assets/templates/env.tpl.ejs'
  }))
  .pipe(rename('app.env.js'))
  .pipe(gulp.dest('development/application'))
})

// Watching changes in less, js, and images and run specific task based on the changes
gulp.task('watch', function() {
  livereload.listen(35732);
  gulp.watch('development/assets/less/**/*.less', ['build-app-css']);
  gulp.watch('development/application/**/*.js', ['index']);
  gulp.watch('development/application/**/*.html', livereload.changed);
  gulp.watch('development/assets/images/*', ['images']);
  gulp.watch('development/bower_components/*/*.js', ['index']);
})

gulp.task('delete-dist', function() {
  return del(['development/dist/**/*']);
})

gulp.task('delete', function() {
    return del([selectedConfig.ENV.name + '/**/*']);
})

gulp.task('remove-livereload', function() {
  gulp.src(selectedConfig.ENV.name + '/index.html')
    .pipe(htmlreplace({'js': ''}))
    .pipe(gulp.dest(selectedConfig.ENV.name));
})
