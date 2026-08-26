import { renderHook, act, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Linking } from 'react-native';
import { useBooks } from '@/features/books/hooks/useBooks';
import booksReducer from '@/features/books/store/booksSlice';
import { BOOK_GENRES } from '@/features/books/constants';

jest.mock('@/features/books/services/storage', () => ({
  getCachedBooks: jest.fn(() => null),
  setCachedBooks: jest.fn(),
  clearAllCache: jest.fn(),
}));

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({
    data: { count: 1, next: null, previous: null, results: [{
      id: 1,
      title: 'Moby Dick',
      authors: [{ name: 'Melville, Herman' }],
      formats: { 'image/jpeg': 'https://example.com/cover.jpg', 'text/html': 'https://example.com/book.html' },
      download_count: 5000,
    }] },
  }),
}));

const buildStore = (books: any[] = [], extra: Partial<any> = {}) =>
  configureStore({
    reducer: { books: booksReducer },
    preloadedState: {
      books: {
        books,
        loading: false,
        error: null,
        nextUrl: null,
        searchQuery: '',
        selectedGenre: '',
        genres: BOOK_GENRES,
        isOffline: false,
        ...extra,
      },
    },
    middleware: getDefault => getDefault({ serializableCheck: false }),
  });

const wrapper =
  (store: ReturnType<typeof buildStore>) =>
  ({ children }: { children: React.ReactNode }) =>
    React.createElement(Provider, { store }, children);

const mockBook = {
  id: 1,
  title: 'Moby Dick',
  authors: [{ name: 'Melville, Herman' }],
  translators: [],
  subjects: ['Fiction'],
  bookshelves: [],
  languages: ['en'],
  copyright: false,
  media_type: 'Text',
  formats: {
    'image/jpeg': 'https://example.com/cover.jpg',
    'text/html': 'https://example.com/book.html',
  },
  download_count: 5000,
};

describe('useBooks — state init', () => {
  it('searchQuery starts empty', async () => {
    const { result } = await renderHook(() => useBooks('Fiction'), {
      wrapper: wrapper(buildStore()),
    });
    await waitFor(() => expect(result.current.searchQuery).toBe(''));
  });

  it('modalVisible starts false', async () => {
    const { result } = await renderHook(() => useBooks('Fiction'), {
      wrapper: wrapper(buildStore()),
    });
    await waitFor(() => expect(result.current.modalVisible).toBe(false));
  });

  it('showSnackbar starts false', async () => {
    const { result } = await renderHook(() => useBooks('Fiction'), {
      wrapper: wrapper(buildStore()),
    });
    await waitFor(() => expect(result.current.showSnackbar).toBe(false));
  });

  it('refreshing starts false', async () => {
    const { result } = await renderHook(() => useBooks('Fiction'), {
      wrapper: wrapper(buildStore()),
    });
    await waitFor(() => expect(result.current.refreshing).toBe(false));
  });

  it('returns books from store', async () => {
    const store = buildStore([mockBook] as any);
    const { result } = await renderHook(() => useBooks('Fiction'), {
      wrapper: wrapper(store),
    });
    await waitFor(() => {
      expect(result.current.books).toBeDefined();
      expect(result.current.books).toHaveLength(1);
    });
  });
});

describe('useBooks — setters', () => {
  it('setSearchQuery updates searchQuery', async () => {
    const { result } = await renderHook(() => useBooks('Fiction'), {
      wrapper: wrapper(buildStore()),
    });
    await waitFor(() => expect(result.current.searchQuery).toBe(''));
    await act(async () => { result.current.setSearchQuery('hamlet'); });
    expect(result.current.searchQuery).toBe('hamlet');
  });

  it('setModalVisible toggles modal', async () => {
    const { result } = await renderHook(() => useBooks('Fiction'), {
      wrapper: wrapper(buildStore()),
    });
    await waitFor(() => expect(result.current.modalVisible).toBe(false));
    await act(async () => { result.current.setModalVisible(true); });
    expect(result.current.modalVisible).toBe(true);
  });

  it('setShowSnackbar toggles snackbar', async () => {
    const { result } = await renderHook(() => useBooks('Fiction'), {
      wrapper: wrapper(buildStore()),
    });
    await waitFor(() => expect(result.current.showSnackbar).toBe(false));
    await act(async () => { result.current.setShowSnackbar(true); });
    expect(result.current.showSnackbar).toBe(true);
  });
});

describe('useBooks — handleLoadMore', () => {
  it('does not dispatch fetchBooks when no nextUrl', async () => {
    const store = buildStore([], { nextUrl: null });
    const { result } = await renderHook(() => useBooks('Fiction'), {
      wrapper: wrapper(store),
    });
    await waitFor(() => expect(result.current.loading).toBeDefined());
    const beforeActions = store.getState().books.books.length;
    await act(async () => { result.current.handleLoadMore(); });
    // books remain empty, no fetch appended
    expect(store.getState().books.books.length).toBe(beforeActions);
  });
});

describe('useBooks — handleBookPress', () => {
  const openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);

  beforeEach(() => openURL.mockClear());

  it('opens html link when available', async () => {
    const { result } = await renderHook(() => useBooks('Fiction'), {
      wrapper: wrapper(buildStore()),
    });
    await waitFor(() => expect(result.current.handleBookPress).toBeDefined());
    await act(async () => { result.current.handleBookPress(mockBook); });
    expect(openURL).toHaveBeenCalledWith('https://example.com/book.html');
  });

  it('opens pdf link when no html', async () => {
    const pdfBook = {
      ...mockBook,
      formats: {
        'image/jpeg': 'https://example.com/cover.jpg',
        'application/pdf': 'https://example.com/book.pdf',
      },
    };
    const { result } = await renderHook(() => useBooks('Fiction'), {
      wrapper: wrapper(buildStore()),
    });
    await waitFor(() => expect(result.current.handleBookPress).toBeDefined());
    await act(async () => { result.current.handleBookPress(pdfBook); });
    expect(openURL).toHaveBeenCalledWith('https://example.com/book.pdf');
  });

  it('sets modal visible when no usable format', async () => {
    const noFormatBook = {
      ...mockBook,
      formats: { 'image/jpeg': 'https://example.com/cover.jpg' },
    };
    const { result } = await renderHook(() => useBooks('Fiction'), {
      wrapper: wrapper(buildStore()),
    });
    await waitFor(() => expect(result.current.handleBookPress).toBeDefined());
    await act(async () => { result.current.handleBookPress(noFormatBook); });
    expect(result.current.modalVisible).toBe(true);
    expect(result.current.modalMessage).toBeTruthy();
  });

  it('skips zip links', async () => {
    const zipBook = {
      ...mockBook,
      formats: { 'text/html': 'https://example.com/book.zip', 'image/jpeg': '' },
    };
    const { result } = await renderHook(() => useBooks('Fiction'), {
      wrapper: wrapper(buildStore()),
    });
    await waitFor(() => expect(result.current.handleBookPress).toBeDefined());
    await act(async () => { result.current.handleBookPress(zipBook); });
    expect(result.current.modalVisible).toBe(true);
  });
});
