import { StyleSheet } from 'react-native';
import { Theme, lightColors } from '@/ui/theme';

export const getStyles = (colors: typeof lightColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.xxl,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.lg,
    backgroundColor: colors.white,
  },
  backButton: {
    marginRight: Theme.spacing.md,
  },
  backArrow: {
    fontSize: Theme.fontSizes.largeTitle,
    fontFamily: Theme.fonts.semiBold,
    color: colors.primary,
  },
  title: {
    fontSize: Theme.fontSizes.title,
    fontFamily: Theme.fonts.semiBold,
    color: colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greyLight,
    borderRadius: Theme.spacing.xs,
    marginHorizontal: Theme.spacing.xxl,
    marginBottom: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.m,
    height: Theme.spacing.huge,
  },
  searchIcon: {
    marginRight: Theme.spacing.sm,
    fontSize: Theme.fontSizes.md,
    color: colors.greyMedium,
  },
  searchInput: {
    flex: 1,
    fontSize: Theme.fontSizes.md,
    fontFamily: Theme.fonts.semiBold,
    color: colors.greyDark,
    padding: 0,
  },
  clearButton: {
    padding: Theme.spacing.xs,
  },
  list: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.lg,
    backgroundColor: colors.background2,
  },
  listEmpty: {
    flexGrow: 1,
  },
  row: {
    justifyContent: 'flex-start',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.xxl,
  },
  errorText: {
    fontSize: Theme.fontSizes.md,
    fontFamily: Theme.fonts.regular,
    color: 'red',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: Theme.fontSizes.md,
    fontFamily: Theme.fonts.regular,
    color: colors.greyMedium,
  },
  footerLoader: {
    paddingVertical: Theme.spacing.lg,
    alignItems: 'center',
  },

  offlineBanner: {
    backgroundColor: colors.redLight,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.redMedium,
  },
  offlineText: {
    color: colors.redDark,
    fontFamily: Theme.fonts.semiBold,
    fontSize: Theme.fontSizes.sm,
    marginLeft: Theme.spacing.s,
  },
});
