import { useColorScheme } from 'react-native';

export const lightColors = {
  primary: '#5E56E7',
  primaryLight: '#F8F7FF',
  background: '#FFFFFF',
  background2: '#F8F7FF',
  greyLight: '#F0F0F6',
  greyMedium: '#A0A0A0',
  greyDark: '#333333',
  white: '#FFFFFF',
  black: '#000000',
  success: '#10B981',
  redLight: '#FEE2E2',
  redMedium: '#FCA5A5',
  redDark: '#991B1B',
};

export const darkColors = {
  primary: '#7C75FF',
  primaryLight: '#1A182E',
  background: '#121214',
  background2: '#1A182E',
  greyLight: '#2A2935',
  greyMedium: '#888888',
  greyDark: '#E1E1E6',
  white: '#1E1E24',
  black: '#FFFFFF',
  success: '#10B981',
  redLight: '#451E1E',
  redMedium: '#FCA5A5',
  redDark: '#FF8A8A',
};

export const Theme = {
  colors: lightColors, // Fallback / default
  fonts: {
    regular: 'Montserrat-Regular',
    semiBold: 'Montserrat-SemiBold',
    medium: 'Montserrat-Regular',
  },
  spacing: {
    xs: 4,
    s: 6,
    sm: 8,
    m: 10,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 40,
    giant: 50,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    title: 30,
    largeTitle: 32,
    hugeTitle: 48,
  },
};

export function useAppTheme() {
  const scheme = useColorScheme();
  console.log('useColorScheme detected scheme:', scheme);
  const isDark = scheme === 'dark';
  const colors = isDark ? darkColors : lightColors;
  return { ...Theme, colors, isDark };
}

