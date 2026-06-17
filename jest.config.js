module.exports = {
  verbose: true,
  maxConcurrency: 15,
  testEnvironment: 'jsdom',
  // Use Jest's own crawler instead of Watchman. Avoids intermittent "test suite failed to run"
  // haste-map staleness right after filesystem mutations (e.g. `preversion`'s `yarn install && yarn test`).
  watchman: false,
  // Preserve the pre-jest-29 snapshot serializer so existing snapshots stay valid
  // (jest 29 changed the defaults to { escapeString: false, printBasicPrototype: false }).
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true,
  },
  transformIgnorePatterns: [],
  transform: {
    '.(js|jsx)$': 'babel-jest',
    // Type-checking is enforced separately by `yarn types` (tsc, which excludes test files);
    // transpile-only keeps test runs fast and deterministic (no flaky cross-file type errors).
    '.(ts|tsx)$': ['ts-jest', { isolatedModules: true }],
  },
  moduleNameMapper: {
    '\\.(css|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/assetsTransformer.js',
    'mock-builders(.*)$': '<rootDir>/src/mock-builders$1',
  },
  globals: {},
};
