import React, { useMemo } from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  useWindowDimensions,
} from 'react-native';
import { formatAuthorName } from '@/utils';
import { Book } from '@/features/books/types';
import { getStyles } from '@/features/books/components/BookCard.styles';
import { useAppTheme } from '@/ui/theme';

interface BookCardProps {
  item: Book;
  onPress: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = React.memo(
  ({ item, onPress }) => {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const { colors } = useAppTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
      <TouchableOpacity
        style={[styles.bookCard, isLandscape && styles.bookCardLandscape]}
        activeOpacity={0.8}
        onPress={() => onPress(item)}
        accessibilityRole="button"
        accessibilityLabel={`${item.title} by ${
          formatAuthorName(item.authors[0]?.name) || 'Unknown Author'
        }`}
      >
        <Image
          source={{
            uri:
              item.formats['image/jpeg'] ||
              'https://placehold.co/150x225.png?text=No+Cover',
          }}
          style={styles.bookImage}
        />
        <Text
          style={styles.bookTitle}
          numberOfLines={2}
          allowFontScaling={false}
        >
          {item.title.toUpperCase()}
        </Text>
        <Text
          style={styles.bookAuthor}
          numberOfLines={1}
          allowFontScaling={false}
        >
          {formatAuthorName(item.authors[0]?.name)}
        </Text>
      </TouchableOpacity>
    );
  },
);

