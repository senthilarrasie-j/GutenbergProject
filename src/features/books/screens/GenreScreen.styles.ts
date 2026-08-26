import { StyleSheet } from 'react-native';
import { Theme, lightColors } from '@/ui/theme';

export const getStyles = (colors: typeof lightColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background2,
  },
  header: {
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xxl,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: Theme.fontSizes.hugeTitle,
    fontFamily: Theme.fonts.semiBold,
    color: colors.primary,
    lineHeight: 52,
    marginBottom: Theme.spacing.lg,
  },
  subtitle: {
    fontSize: Theme.fontSizes.md,
    fontFamily: Theme.fonts.semiBold,
    color: colors.greyDark,
    lineHeight: 22,
  },
  list: {
    paddingHorizontal: Theme.spacing.xxl,
    paddingBottom: Theme.spacing.xxxl,
    backgroundColor: 'transparent',
  },
  landscapeRow: {
    justifyContent: 'space-between',
  },
});

