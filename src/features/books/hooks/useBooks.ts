import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Linking } from 'react-native';
import { RootState, AppDispatch } from '@/store';
import { fetchBooks, clearBooks } from '@/features/books/store';
import { Book } from '@/features/books/types';
import { useTranslation } from 'react-i18next';

export const useBooks = (genre: string) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const { books, loading, error, nextUrl, isOffline } = useSelector(
    (state: RootState) => state.books,
  );


  useEffect(() => {
    dispatch(clearBooks());
  }, [genre, dispatch]);

  useEffect(() => {
    dispatch(clearBooks());
    const delayDebounce = setTimeout(() => {
      dispatch(fetchBooks({ genre, search: searchQuery }));
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, genre, dispatch]);

  const handleLoadMore = () => {
    if (nextUrl && !loading) {
      dispatch(fetchBooks({ genre, nextUrl }));
    }
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    const result = await dispatch(fetchBooks({ genre, search: searchQuery }));
    setRefreshing(false);
    if (fetchBooks.fulfilled.match(result)) {
      setShowSnackbar(true);
    }
  }, [dispatch, genre, searchQuery]);

  const handleBookPress = useCallback((book: Book) => {
    try {
      const formats = book?.formats || {};
      const isNotZip = (url?: string) => !!url && !url.endsWith('.zip');

      const htmlKey = Object.keys(formats).find(
        key => key.includes('html') && isNotZip(formats[key]),
      );
      const pdfKey = Object.keys(formats).find(
        key => key.includes('pdf') && isNotZip(formats[key]),
      );
      const txtKey = Object.keys(formats).find(
        key =>
          (key.includes('plain') || key.includes('text')) &&
          !key.includes('html') &&
          isNotZip(formats[key]),
      );

      const targetUrl =
        (htmlKey ? formats[htmlKey] : null) ||
        (pdfKey ? formats[pdfKey] : null) ||
        (txtKey ? formats[txtKey] : null);

      if (targetUrl) {
        Linking.openURL(targetUrl).catch(() => {
          setModalMessage(t('errorOpenLink'));
          setModalVisible(true);
        });
      } else {
        setModalMessage(t('errorNoVersion'));
        setModalVisible(true);
      }
    } catch (err) {
      console.error('Error handling book press:', err);
      setModalMessage(t('errorOpenLink'));
      setModalVisible(true);
    }
  }, [t]);

  return {
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
  };
};
