// Mock @react-native-community/netinfo
const NetInfo = {
  fetch: jest.fn(() =>
    Promise.resolve({ isConnected: true, isInternetReachable: true }),
  ),
  addEventListener: jest.fn(() => jest.fn()),
  useNetInfo: jest.fn(() => ({ isConnected: true })),
};

module.exports = NetInfo;
module.exports.default = NetInfo;
