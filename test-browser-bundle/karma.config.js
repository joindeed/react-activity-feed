module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    browsers: ['ChromiumHeadless'],
    files: [
      '../node_modules/chai/chai.js',
      '../node_modules/react/umd/react.development.js',
      '../node_modules/react-dom/umd/react-dom.development.js',
      '../dist/browser.full-bundle.js',
      'index.js',
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
  });
};
