import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { styles } from './GenreScreen.styles';
import { setSelectedGenre } from '@/features/books/store';
import { BOOK_STRINGS } from '@/features/books/constants';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppNavigator';

type GenreScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Genre'
>;

interface Props {
  navigation: GenreScreenNavigationProp;
}

const GenreScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const genres = useSelector((state: RootState) => state.books.genres);

  const handleGenreSelect = (genreTitle: string) => {
    dispatch(setSelectedGenre(genreTitle));
    navigation.navigate('BookList', { genre: genreTitle });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>{BOOK_STRINGS.headerTitle}</Text>
      <Text style={styles.subtitle}>
        {BOOK_STRINGS.headerSubtitle}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={genres}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => handleGenreSelect(item.title)}
          >
            <View style={styles.cardLeft}>
              <Text style={styles.cardText}>{item.title.toUpperCase()}</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default GenreScreen;
