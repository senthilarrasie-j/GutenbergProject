// Mock react-native-mmkv
const mockStorage = {
  getString: jest.fn(),
  set: jest.fn(),
  delete: jest.fn(),
  clearAll: jest.fn(),
  contains: jest.fn(),
};

module.exports = {
  createMMKV: jest.fn(() => mockStorage),
  MMKV: jest.fn(() => mockStorage),
  __mockStorage: mockStorage,
};
