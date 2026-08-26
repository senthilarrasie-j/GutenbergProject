import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { styles } from './GenreScreen.styles';
import { setSelectedGenre } from '@/features/books/store';
import { BOOK_STRINGS } from '@/features/books/constants';
import { useExitApp } from '@/features/books/hooks';
import { CustomModal } from '@/features/books/components';

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
  const { exitModalVisible, handleExitApp, handleCancelExit } = useExitApp();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const handleGenreSelect = (genreTitle: string) => {
    dispatch(setSelectedGenre(genreTitle));
    navigation.navigate('BookList', { genre: genreTitle });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title} allowFontScaling={false}>{BOOK_STRINGS.headerTitle}</Text>
      <Text style={styles.subtitle} allowFontScaling={false}>
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
        numColumns={isLandscape ? 2 : 1}
        key={isLandscape ? 'landscape' : 'portrait'}
        columnWrapperStyle={isLandscape ? styles.landscapeRow : undefined}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              isLandscape && styles.landscapeCard
            ]}
            activeOpacity={0.8}
            onPress={() => handleGenreSelect(item.title)}
            accessibilityRole="button"
            accessibilityLabel={`Genre ${item.title}`}
          >
            <View style={styles.cardLeft}>
              <Text style={styles.cardText} allowFontScaling={false}>{item.title.toUpperCase()}</Text>
            </View>
            <Text style={styles.arrow} allowFontScaling={false}>→</Text>
          </TouchableOpacity>
        )}
      />

      <CustomModal
        visible={exitModalVisible}
        title="Exit App"
        message="Do you want to exit the application?"
        onClose={handleCancelExit}
        buttons={[
          { text: 'Cancel', onPress: handleCancelExit, type: 'cancel' },
          { text: 'Exit', onPress: handleExitApp, type: 'primary' },
        ]}
      />
    </SafeAreaView>
  );
};

export default GenreScreen;
