module.exports = {
  development: {
    css: [
      './development/dist/css/*.css'
    ],
    js: [
      './development/bower_components/angular/angular.js',
      './development/bower_components/angular-sanitize/angular-sanitize.js',
      './development/bower_components/angular-ui-router/release/angular-ui-router.js',
      './development/bower_components/angular-animate/angular-animate.js',
      './development/application/*.js',
      './development/application/modules/**/*.js',
      './development/application/partials/**/*.js'
    ],
    ENV: {
      name:'development',
      baseUrl: '/',
      port: process.env.PORT || '8080'
    }
  }
};
