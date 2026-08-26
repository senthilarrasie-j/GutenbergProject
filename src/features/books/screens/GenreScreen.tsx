import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { styles, exitStyles } from './GenreScreen.styles';
import { setSelectedGenre } from '@/features/books/store';
import { BOOK_STRINGS } from '@/features/books/constants';
import { useExitApp } from '@/features/books/hooks';

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
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={exitModalVisible}
        onRequestClose={handleCancelExit}
      >
        <View style={exitStyles.modalOverlay}>
          <View style={exitStyles.modalContent}>
            <Text style={exitStyles.modalTitle} allowFontScaling={false}>Exit App</Text>
            <Text style={exitStyles.modalText} allowFontScaling={false}>Do you want to exit the application?</Text>
            <View style={exitStyles.buttonContainer}>
              <TouchableOpacity
                style={[exitStyles.button, exitStyles.cancelButton]}
                onPress={handleCancelExit}
                accessibilityRole="button"
                accessibilityLabel="Cancel exit"
              >
                <Text style={exitStyles.cancelButtonText} allowFontScaling={false}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[exitStyles.button, exitStyles.confirmButton]}
                onPress={handleExitApp}
                accessibilityRole="button"
                accessibilityLabel="Confirm exit"
              >
                <Text style={exitStyles.confirmButtonText} allowFontScaling={false}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default GenreScreen;
