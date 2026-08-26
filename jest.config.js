module.exports = {
  preset: '@react-native/jest-preset',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^react-native-mmkv$': '<rootDir>/__tests__/__mocks__/react-native-mmkv.js',
    '^@react-native-community/netinfo$': '<rootDir>/__tests__/__mocks__/@react-native-community/netinfo.js',
    '^react-native-safe-area-context$': '<rootDir>/__tests__/__mocks__/react-native-safe-area-context.js',
    '^react-native-vector-icons/Ionicons$': '<rootDir>/__tests__/__mocks__/react-native-vector-icons/Ionicons.js',
    '^react-native-localize$': '<rootDir>/__tests__/__mocks__/react-native-localize.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|react-native-mmkv|react-native-vector-icons|react-native-safe-area-context|react-native-screens|react-native-gesture-handler|react-native-reanimated|react-native-worklets|react-native-nitro-modules|@react-navigation|@reduxjs)/)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/__mocks__/',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.styles.{ts,tsx}',
    '!src/**/index.ts',
    '!src/**/*.d.ts',
  ],
};
