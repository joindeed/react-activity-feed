module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    // Ubuntu 24.04 AppArmor blocks Chromium's unprivileged user namespaces,
    // so the sandbox cannot start in CI. --no-sandbox is safe here because
    // the browser only loads our own test bundle, not untrusted content.
    // See https://chromium.googlesource.com/chromium/src/+/main/docs/linux/sandboxing.md
    browsers: ['ChromiumHeadlessNoSandbox'],
    customLaunchers: {
      ChromiumHeadlessNoSandbox: {
        base: 'ChromiumHeadless',
        flags: ['--no-sandbox'],
      },
    },
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
