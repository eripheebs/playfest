module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],
    files: [
      'frontend/www/lib/angular/angular.js',
      'frontend/www/lib/angular/angular-mocks/angular-mocks.js',
      'frontend/www/js/**/*.js',
      'unit/**/*.js'
    ],
    exclude: [
    ],
    preprocessors: {
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
