// docz v2 / Gatsby v2 uses webpack v4, which can't handle named exports
// from .mjs files. linkifyjs 4.x and linkify-plugin-mention 4.x ship .mjs
// as their "module" field, causing "Can't import the named export 'X' from
// non EcmaScript module" errors during the docs build. This forces webpack
// to resolve the CJS ("main") field instead.
//
// Webpack v4 also doesn't know about Node 20's built-in modules, so we
// provide empty fallbacks for server-only modules that browser bundles
// should never actually import.
exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  const config = getConfig();

  if (config.resolve) {
    config.resolve.mainFields = ['main', 'browser', 'module'];
  }

  config.node = {
    ...(config.node || {}),
    tls: 'empty',
    net: 'empty',
    fs: 'empty',
    child_process: 'empty',
  };

  actions.replaceWebpackConfig(config);
};