import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BooksState, GutendexResponse } from '@/features/books/types';
import { BOOK_GENRES, BOOK_STRINGS } from '@/features/books/constants';
import { fetchBooksApi, FetchBooksArgs } from '@/features/books/api';

export const fetchBooks = createAsyncThunk<
  { data: GutendexResponse; isNext: boolean },
  FetchBooksArgs,
  { rejectValue: string }
>(
  'books/fetchBooks',
  async (args: FetchBooksArgs, { rejectWithValue }) => {
    try {
      return await fetchBooksApi(args);
    } catch (err: any) {
      console.error('Network request failed. Args:', args, 'Error:', err);
      return rejectWithValue(err.message || BOOK_STRINGS.failedToFetch);
    }
  },
);

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
  nextUrl: null,
  searchQuery: '',
  selectedGenre: '',
  genres: BOOK_GENRES,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSelectedGenre(state, action: PayloadAction<string>) {
      state.selectedGenre = action.payload;
      state.books = [];
      state.nextUrl = null;
    },
    clearBooks(state) {
      state.books = [];
      state.nextUrl = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.nextUrl = action.payload.data.next;
        if (action.payload.isNext) {
          state.books = [...state.books, ...action.payload.data.results];
        } else {
          state.books = action.payload.data.results;
        }
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, setSelectedGenre, clearBooks } =
  booksSlice.actions;
export default booksSlice.reducer;
