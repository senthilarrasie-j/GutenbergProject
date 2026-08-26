import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppTheme } from '@/ui/theme';
import { getStyles } from '@/features/books/screens/BookListScreen.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useBooks } from '@/features/books/hooks';
import { BookCard, Snackbar, CustomModal } from '@/features/books/components';
import { useTranslation } from 'react-i18next';

type BookListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'BookList'
>;

const BookListScreen: React.FC<BookListScreenProps> = ({
  route,
  navigation,
}) => {
  const { t } = useTranslation();
  const { genre } = route.params || { genre: 'Fiction' };
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const { colors } = useAppTheme();
  const styles = useMemo(() => getStyles(colors), [colors]);

  const {
    books,
    loading,
    error,
    isOffline,
    searchQuery,
    setSearchQuery,
    handleLoadMore,
    handleRefresh,
    handleBookPress,
    modalVisible,
    setModalVisible,
    modalMessage,
    refreshing,
    showSnackbar,
    setShowSnackbar,
  } = useBooks(genre);

  const renderItem = useCallback(
    ({ item }: any) => {
      return <BookCard item={item} onPress={handleBookPress} />;
    },
    [handleBookPress],
  );

  const renderFooter = () => {
    if (!loading || books.length === 0 || refreshing) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  };

  const renderEmpty = () => {
    if (books.length === 0 && loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.center}>
          <Text style={styles.errorText} allowFontScaling={false}>
            {error}
          </Text>
        </View>
      );
    }
    if (books.length === 0) {
      return (
        <View style={styles.center}>
          <Text style={styles.emptyText} allowFontScaling={false}>
            {t('noBooksFound')}
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Icon name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title} allowFontScaling={false}>
          {genre}
        </Text>
      </View>

      {/* Offline Banner */}
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Icon name="cloud-offline" size={16} color="#991B1B" />
          <Text style={styles.offlineText} allowFontScaling={false}>
            Viewing offline cached data
          </Text>
        </View>
      )}

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Icon
          name="search"
          size={18}
          color={colors.greyMedium}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder={t('searchPlaceholder')}
          placeholderTextColor={colors.greyMedium}
          value={searchQuery}
          onChangeText={setSearchQuery}
          allowFontScaling={false}
          accessibilityRole="search"
          accessibilityLabel="Search books"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
            accessibilityRole="button"
            accessibilityLabel="Clear search text"
          >
            <Icon
              name="close-circle"
              size={20}
              color={colors.greyMedium}
            />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={books}
        keyExtractor={item => item.id.toString()}
        numColumns={isLandscape ? 6 : 3}
        key={isLandscape ? 'landscape' : 'portrait'}
        columnWrapperStyle={books.length > 0 ? styles.row : undefined}
        contentContainerStyle={[
          styles.list,
          books.length === 0 && styles.listEmpty,
        ]}
        ListEmptyComponent={renderEmpty}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        windowSize={5}
        removeClippedSubviews={Platform.OS === 'android'}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />

      <CustomModal
        visible={modalVisible}
        title={t('errorTitle')}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
      <Snackbar
        visible={showSnackbar}
        message="Books updated successfully!"
        onDismiss={() => setShowSnackbar(false)}
      />
    </SafeAreaView>
  );
};

export default BookListScreen;
