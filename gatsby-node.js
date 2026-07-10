// docz v2 / Gatsby v2 uses webpack v4, which can't handle named exports
// from .mjs files. linkifyjs 4.x and linkify-plugin-mention 4.x ship .mjs
// as their "module" field, causing "Can't import the named export 'X' from
// non EcmaScript module" errors during the docs build. We alias both
// packages directly to their CJS ("main") entries so webpack v4 can parse
// them, without globally overriding mainFields (which would break packages
// that rely on the "browser" field).
//
// Webpack v4 also doesn't know about Node 20's built-in modules, so we
// provide empty fallbacks for server-only modules that browser bundles
// should never actually import.
//
// Some newer transitive deps ship ESM-first or modern CJS that webpack v4's
// acorn parser can't handle. We pin those to older CJS-compatible versions
// via package.json resolutions.

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();

  if (config.resolve) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      linkifyjs: require.resolve('linkifyjs/dist/linkify.cjs'),
      'linkify-plugin-mention': require.resolve('linkify-plugin-mention/dist/linkify-plugin-mention.cjs'),
    };
  }

  config.node = {
    ...(config.node || {}),
    tls: 'empty',
    net: 'empty',
    fs: 'empty',
    child_process: 'empty',
    // assert pulls in object.assign/polyfill via a subpath require that
    // webpack v4's resolver can't resolve for packages without an exports
    // field. Mock it since assert is only used in dev/test code paths.
    assert: 'empty',
  };

  actions.replaceWebpackConfig(config);
};
