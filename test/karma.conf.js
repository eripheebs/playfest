module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],
    files: [
      '../frontend/www/lib/angular/angular.js',
      '../frontend/www/lib/ionic/js/ionic.bundle.js',
      '../frontend/www/lib/angular-mocks/angular-mocks.js',
      // '../frontend/www/lib/angular-route/angular-route.js',
      // '../frontend/www/lib/angular-resource/angular-resource.js',
      '../frontend/www/lib/ngCordova/dist/ng-cordova.js',
      '../frontend/www/js/**/*.js',
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
