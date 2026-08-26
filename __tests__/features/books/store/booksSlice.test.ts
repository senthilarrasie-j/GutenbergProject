import booksReducer, {
  setSearchQuery,
  setSelectedGenre,
  clearBooks,
} from '@/features/books/store/booksSlice';
import { BOOK_GENRES } from '@/features/books/constants';
import type { BooksState } from '@/features/books/types';

const initialState: BooksState = {
  books: [],
  loading: true,
  error: null,
  nextUrl: null,
  searchQuery: '',
  selectedGenre: '',
  genres: BOOK_GENRES,
  isOffline: false,
};

const mockBook = {
  id: 1,
  title: 'Moby Dick',
  authors: [{ name: 'Melville, Herman' }],
  translators: [],
  subjects: ['Adventure'],
  bookshelves: [],
  languages: ['en'],
  copyright: false,
  media_type: 'Text',
  formats: { 'image/jpeg': 'https://example.com/cover.jpg' },
  download_count: 5000,
};

describe('booksSlice — reducers', () => {
  it('returns initial state', () => {
    expect(booksReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('setSearchQuery updates searchQuery', () => {
    const state = booksReducer(initialState, setSearchQuery('hamlet'));
    expect(state.searchQuery).toBe('hamlet');
  });

  it('setSearchQuery to empty string', () => {
    const withQuery = { ...initialState, searchQuery: 'test' };
    const state = booksReducer(withQuery, setSearchQuery(''));
    expect(state.searchQuery).toBe('');
  });

  it('setSelectedGenre updates selectedGenre and resets books/nextUrl/loading/error', () => {
    const populated: BooksState = {
      ...initialState,
      books: [mockBook],
      nextUrl: 'https://next.url',
      loading: false,
      error: 'some error',
      selectedGenre: 'Fiction',
    };
    const state = booksReducer(populated, setSelectedGenre('Drama'));
    expect(state.selectedGenre).toBe('Drama');
    expect(state.books).toEqual([]);
    expect(state.nextUrl).toBeNull();
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('clearBooks resets books/nextUrl/loading/error', () => {
    const populated: BooksState = {
      ...initialState,
      books: [mockBook],
      nextUrl: 'https://next.url',
      loading: false,
      error: 'some error',
    };
    const state = booksReducer(populated, clearBooks());
    expect(state.books).toEqual([]);
    expect(state.nextUrl).toBeNull();
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
});

describe('booksSlice — extraReducers (fetchBooks)', () => {
  it('pending sets loading=true, error=null', () => {
    const state = booksReducer(
      { ...initialState, loading: false, error: 'old error' },
      { type: 'books/fetchBooks/pending' },
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled (first load) sets books from payload', () => {
    const action = {
      type: 'books/fetchBooks/fulfilled',
      payload: {
        data: { count: 1, next: 'https://next', previous: null, results: [mockBook] },
        isNext: false,
        isOffline: false,
      },
    };
    const state = booksReducer(initialState, action);
    expect(state.books).toEqual([mockBook]);
    expect(state.loading).toBe(false);
    expect(state.nextUrl).toBe('https://next');
    expect(state.isOffline).toBe(false);
  });

  it('fulfilled (isNext=true) appends books', () => {
    const existing = { ...initialState, books: [mockBook] };
    const newBook = { ...mockBook, id: 2, title: 'Hamlet' };
    const action = {
      type: 'books/fetchBooks/fulfilled',
      payload: {
        data: { count: 1, next: null, previous: null, results: [newBook] },
        isNext: true,
        isOffline: false,
      },
    };
    const state = booksReducer(existing, action);
    expect(state.books).toHaveLength(2);
    expect(state.books[1].id).toBe(2);
  });

  it('fulfilled (isOffline=true) sets books from payload and nextUrl=null', () => {
    const action = {
      type: 'books/fetchBooks/fulfilled',
      payload: {
        data: { count: 1, next: null, previous: null, results: [mockBook] },
        isNext: false,
        isOffline: true,
      },
    };
    const state = booksReducer(initialState, action);
    expect(state.isOffline).toBe(true);
    expect(state.nextUrl).toBeNull();
    expect(state.books).toEqual([mockBook]);
  });

  it('fulfilled (isOffline=true, isNext=true) does NOT append, replaces', () => {
    const existing = { ...initialState, books: [mockBook] };
    const newBook = { ...mockBook, id: 2, title: 'Hamlet' };
    const action = {
      type: 'books/fetchBooks/fulfilled',
      payload: {
        data: { count: 1, next: null, previous: null, results: [newBook] },
        isNext: true,
        isOffline: true,
      },
    };
    const state = booksReducer(existing, action);
    // isNext && !isOffline is false → replaces
    expect(state.books).toEqual([newBook]);
  });

  it('rejected sets loading=false, isOffline=true, error from payload', () => {
    const action = {
      type: 'books/fetchBooks/rejected',
      payload: 'Network error',
    };
    const state = booksReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.isOffline).toBe(true);
    expect(state.error).toBe('Network error');
  });

  it('rejected with undefined payload sets error=undefined', () => {
    const action = {
      type: 'books/fetchBooks/rejected',
      payload: undefined,
    };
    const state = booksReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.isOffline).toBe(true);
  });
});
