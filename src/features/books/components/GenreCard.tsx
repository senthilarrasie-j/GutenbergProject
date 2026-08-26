import React, { useMemo } from 'react';
import { TouchableOpacity, View, Text, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getStyles } from '@/features/books/components/GenreCard.styles';
import { GENRE_ICONS } from '@/features/books/constants';
import { useAppTheme } from '@/ui/theme';

interface GenreCardProps {
  item: {
    id: string;
    title: string;
  };
  onPress: (genreTitle: string) => void;
}

export const GenreCard: React.FC<GenreCardProps> = React.memo(({ item, onPress }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const { colors } = useAppTheme();
  const styles = useMemo(() => getStyles(colors), [colors]);

  const emoji = GENRE_ICONS[item.title.toLowerCase()] || '📖';

  return (
    <TouchableOpacity
      style={[styles.card, isLandscape && styles.landscapeCard]}
      activeOpacity={0.8}
      onPress={() => onPress(item.title)}
      accessibilityRole="button"
      accessibilityLabel={`Genre ${item.title}`}
    >
      <View style={styles.cardLeft}>
        <Text style={styles.genreIcon} allowFontScaling={false}>
          {emoji}
        </Text>
        <Text style={styles.cardText} allowFontScaling={false}>
          {item.title.toUpperCase()}
        </Text>
      </View>
      <Icon name="arrow-forward-sharp" size={18} color={colors.primary} />
    </TouchableOpacity>
  );
});

