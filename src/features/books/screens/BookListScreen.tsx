import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Theme } from '@/ui/theme';
import { styles } from './BookListScreen.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useBooks } from '@/features/books/hooks';
import { BookCard } from '@/features/books/components';
import { BOOK_STRINGS } from '@/features/books/constants';

type BookListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'BookList'
>;

const BookListScreen: React.FC<BookListScreenProps> = ({
  route,
  navigation,
}) => {
  const { genre } = route.params || { genre: 'Fiction' };

  const {
    books,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handleLoadMore,
    handleBookPress,
    modalVisible,
    setModalVisible,
    modalMessage,
  } = useBooks(genre);

  const renderItem = useCallback(
    ({ item }: any) => {
      return <BookCard item={item} onPress={handleBookPress} />;
    },
    [handleBookPress],
  );

  const renderFooter = () => {
    if (!loading || books.length === 0) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Theme.colors.primary} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{genre}</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Icon
          name="search"
          size={18}
          color={Theme.colors.greyMedium}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder={BOOK_STRINGS.searchPlaceholder}
          placeholderTextColor={Theme.colors.greyMedium}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <Icon
              name="close-circle"
              size={20}
              color={Theme.colors.greyMedium}
            />
          </TouchableOpacity>
        )}
      </View>

      {books.length === 0 && loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Theme.colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : books.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>{BOOK_STRINGS.noBooksFound}</Text>
        </View>
      ) : (
        <FlatList
          data={books}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          initialNumToRender={12}
          maxToRenderPerBatch={12}
          windowSize={5}
          removeClippedSubviews={Platform.OS === 'android'}
          renderItem={renderItem}
        />
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{BOOK_STRINGS.errorTitle}</Text>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default BookListScreen;
