import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppNavigator from '@/navigation/AppNavigator';
import { useAppTheme } from '@/ui/theme';
import { store } from '@/store';
import '@/services/i18n';

export default function App() {
  const { colors, isDark } = useAppTheme();

  const NavigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.background2,
      card: colors.white,
      text: colors.greyDark,
      border: colors.greyLight,
    },
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {/* <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} /> */}

        <StatusBar barStyle={'dark-content'} />
        <NavigationContainer theme={NavigationTheme}>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
