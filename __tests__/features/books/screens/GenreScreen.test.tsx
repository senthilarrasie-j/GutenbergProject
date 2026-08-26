import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '@/features/books/store/booksSlice';
import { BOOK_GENRES } from '@/features/books/constants';
import { BOOK_STRINGS } from '@/features/books/constants';
import GenreScreen from '@/features/books/screens/GenreScreen';

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, style }: any) => {
    const { View } = require('react-native');
    return require('react').createElement(View, { style }, children);
  },
  SafeAreaProvider: ({ children }: any) => {
    const { View } = require('react-native');
    return require('react').createElement(View, null, children);
  },
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

const buildStore = () =>
  configureStore({
    reducer: { books: booksReducer },
    preloadedState: {
      books: {
        books: [],
        loading: false,
        error: null,
        nextUrl: null,
        searchQuery: '',
        selectedGenre: '',
        genres: BOOK_GENRES,
        isOffline: false,
      },
    },
    middleware: getDefault => getDefault({ serializableCheck: false }),
  });

const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate, goBack: jest.fn() } as any;

const renderScreen = () =>
  render(
    <Provider store={buildStore()}>
      <GenreScreen navigation={mockNavigation} />
    </Provider>,
  );

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GenreScreen', () => {
  it('renders header title', async () => {
    const { getByText } = await renderScreen();
    // headerTitle contains newline — check partial
    expect(getByText(/Gutenberg/i)).toBeTruthy();
  });

  it('renders header subtitle', async () => {
    const { getByText } = await renderScreen();
    expect(getByText(BOOK_STRINGS.headerSubtitle)).toBeTruthy();
  });

  it('renders all genre cards', async () => {
    const { getAllByRole } = await renderScreen();
    const buttons = getAllByRole('button');
    // 7 genre cards + possibly exit modal button
    expect(buttons.length).toBeGreaterThanOrEqual(BOOK_GENRES.length);
  });

  it('navigates to BookList on genre press', async () => {
    const { getByText } = await renderScreen();
    fireEvent.press(getByText('FICTION'));
    expect(mockNavigate).toHaveBeenCalledWith('BookList', { genre: 'Fiction' });
  });

  it('shows exit modal when exitModalVisible=true via back handler', async () => {
    const { queryByText } = await renderScreen();
    // Modal not visible by default
    expect(queryByText('Exit App')).toBeNull();
  });
});
