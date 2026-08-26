import { StyleSheet } from 'react-native';
import { Theme } from '@/ui/theme';

export const styles = StyleSheet.create({
  bookCard: {
    flex: 1 / 3,
    marginHorizontal: Theme.spacing.sm,
    marginBottom: Theme.spacing.xl,
    maxWidth: '30%',
  },
  bookCardLandscape: {
    flex: 1 / 6,
    maxWidth: '14.6%',
  },
  bookImage: {
    aspectRatio: 2 / 3,
    width: '100%',
    borderRadius: Theme.spacing.sm,
    backgroundColor: Theme.colors.greyLight,
    marginBottom: Theme.spacing.sm,
    // iOS shadow
    shadowColor: 'rgb(211, 209, 238)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    // Android shadow
    elevation: 3,
  },
  bookTitle: {
    fontSize: Theme.fontSizes.xs,
    fontFamily: Theme.fonts.regular,
    color: Theme.colors.greyDark,
    lineHeight: 14,
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: Theme.fontSizes.xs,
    fontFamily: Theme.fonts.regular,
    color: Theme.colors.greyMedium,
  },
});
