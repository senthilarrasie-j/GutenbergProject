import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { Theme } from '@/ui/theme';
import { formatAuthorName } from '@/utils';
import { Book } from '@/features/books/types';

interface BookCardProps {
  item: Book;
  onPress: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = React.memo(
  ({ item, onPress }) => {
    return (
      <TouchableOpacity
        style={styles.bookCard}
        activeOpacity={0.8}
        onPress={() => onPress(item)}
        accessibilityRole="button"
        accessibilityLabel={`${item.title} by ${formatAuthorName(item.authors[0]?.name) || 'Unknown Author'}`}
      >
        <Image
          source={{
            uri:
              item.formats['image/jpeg'] ||
              'https://placehold.co/150x225.png?text=No+Cover',
          }}
          style={styles.bookImage}
        />
        <Text style={styles.bookTitle} numberOfLines={2} allowFontScaling={false}>
          {item.title.toUpperCase()}
        </Text>
        <Text style={styles.bookAuthor} numberOfLines={1} allowFontScaling={false}>
          {formatAuthorName(item.authors[0]?.name)}
        </Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  bookCard: {
    flex: 1 / 3,
    marginHorizontal: 8,
    marginBottom: 20,
    maxWidth: '30%',
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
