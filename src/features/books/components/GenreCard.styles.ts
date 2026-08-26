import { StyleSheet } from 'react-native';
import { Theme } from '@/ui/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.white,
    height: Theme.spacing.giant,
    borderRadius: Theme.spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.md,
    // iOS shadow
    shadowColor: 'rgb(211, 209, 238)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    // Android shadow
    elevation: 3,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genreIcon: {
    fontSize: Theme.fontSizes.xl,
    marginRight: Theme.spacing.md,
  },
  cardText: {
    fontSize: Theme.fontSizes.md,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.greyDark,
  },
  arrow: {
    fontSize: Theme.fontSizes.lg,
    color: Theme.colors.primary,
    fontFamily: Theme.fonts.semiBold,
  },
  landscapeCard: {
    flex: 1,
    maxWidth: '48%',
    marginHorizontal: Theme.spacing.xs,
  },
});
