// Mock react-native-safe-area-context
const React = require('react');

const SafeAreaView = ({ children, style }) =>
  React.createElement('View', { style }, children);

const SafeAreaProvider = ({ children }) =>
  React.createElement('View', null, children);

const useSafeAreaInsets = () => ({ top: 0, right: 0, bottom: 0, left: 0 });
const useSafeAreaFrame = () => ({ x: 0, y: 0, width: 390, height: 844 });
const SafeAreaInsetsContext = React.createContext({ top: 0, right: 0, bottom: 0, left: 0 });

module.exports = {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
  useSafeAreaFrame,
  SafeAreaInsetsContext,
};
