import { StyleSheet } from 'react-native';
import { Theme } from '@/ui/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.xxl,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.lg,
    backgroundColor: Theme.colors.white,
  },
  backButton: {
    marginRight: Theme.spacing.md,
  },
  backArrow: {
    fontSize: Theme.fontSizes.largeTitle,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.primary,
  },
  title: {
    fontSize: Theme.fontSizes.title,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.greyLight,
    borderRadius: Theme.spacing.xs,
    marginHorizontal: Theme.spacing.xxl,
    marginBottom: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.m,
    height: Theme.spacing.huge,
  },
  searchIcon: {
    marginRight: Theme.spacing.sm,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.greyMedium,
  },
  searchInput: {
    flex: 1,
    fontSize: Theme.fontSizes.md,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.greyDark,
    padding: 0,
  },
  clearButton: {
    padding: Theme.spacing.xs,
  },
  list: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.lg,
    backgroundColor: Theme.colors.background2,
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
    color: Theme.colors.greyMedium,
  },
  footerLoader: {
    paddingVertical: Theme.spacing.lg,
    alignItems: 'center',
  },

  offlineBanner: {
    backgroundColor: Theme.colors.redLight,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.redMedium,
  },
  offlineText: {
    color: Theme.colors.redDark,
    fontFamily: Theme.fonts.semiBold,
    fontSize: Theme.fontSizes.sm,
    marginLeft: Theme.spacing.s,
  },
});
