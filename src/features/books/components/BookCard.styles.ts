import { StyleSheet } from 'react-native';
import { Theme } from '@/ui/theme';

export const styles = StyleSheet.create({
  bookCard: {
    flex: 1 / 3,
    marginHorizontal: 8,
    marginBottom: 20,
    maxWidth: '30%',
  },
  bookCardLandscape: {
    flex: 1 / 6,
    maxWidth: '14.6%',
  },
  bookImage: {
    aspectRatio: 2 / 3,
    width: '100%',
    borderRadius: 8,
    backgroundColor: Theme.colors.greyLight,
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 12,
    fontFamily: Theme.fonts.regular,
    color: Theme.colors.greyDark,
    lineHeight: 14,
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: 12,
    fontFamily: Theme.fonts.regular,
    color: Theme.colors.greyMedium,
  },
});
