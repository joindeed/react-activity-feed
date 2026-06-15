module.exports = {
  verbose: true,
  maxConcurrency: 15,
  testEnvironment: 'jsdom',
  // Preserve the pre-jest-29 snapshot serializer so existing snapshots stay valid
  // (jest 29 changed the defaults to { escapeString: false, printBasicPrototype: false }).
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true,
  },
  transformIgnorePatterns: [],
  transform: {
    '.(js|jsx)$': 'babel-jest',
    '.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/assetsTransformer.js',
    'mock-builders(.*)$': '<rootDir>/src/mock-builders$1',
  },
  globals: {},
};
