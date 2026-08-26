import { StyleSheet } from 'react-native';
import { Theme } from '@/ui/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background2,
  },
  header: {
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xxl,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: Theme.fontSizes.hugeTitle,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.primary,
    lineHeight: 52,
    marginBottom: Theme.spacing.lg,
  },
  subtitle: {
    fontSize: Theme.fontSizes.md,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.greyDark,
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
