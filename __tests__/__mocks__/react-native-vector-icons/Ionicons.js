// Mock react-native-vector-icons
const Icon = 'Icon';
module.exports = Icon;
module.exports.default = Icon;

// Mock specific icon sets
['Ionicons', 'MaterialIcons', 'FontAwesome', 'AntDesign', 'Entypo', 'Feather'].forEach((name) => {
  module.exports[name] = name;
});
