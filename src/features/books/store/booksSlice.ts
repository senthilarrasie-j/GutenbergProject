import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import NetInfo from '@react-native-community/netinfo';
import { BooksState, GutendexResponse } from '@/features/books/types';
import { BOOK_GENRES, BOOK_STRINGS } from '@/features/books/constants';
import { fetchBooksApi, FetchBooksArgs } from '@/features/books/api';
import { getCachedBooks, setCachedBooks } from '@/features/books/services';


export const fetchBooks = createAsyncThunk<
  { data: GutendexResponse; isNext: boolean; isOffline: boolean },
  FetchBooksArgs,
  { rejectValue: string }
>(
  'books/fetchBooks',
  async (args: FetchBooksArgs, { rejectWithValue }) => {
    try {
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        const cached = getCachedBooks(args.genre, args.search);
        if (cached && cached.results.length > 0) {
          return {
            data: {
              count: cached.results.length,
              next: cached.next,
              previous: null,
              results: cached.results,
            },
            isNext: !!args.nextUrl,
            isOffline: true,
          };
        } else {
          return rejectWithValue(BOOK_STRINGS.noConnection);
        }
      }

      const response = await fetchBooksApi(args);
      
      // Update MMKV cache
      if (response.isNext) {
        const cached = getCachedBooks(args.genre, args.search);
        const currentResults = cached ? cached.results : [];
        const mergedResults = [...currentResults];
        response.data.results.forEach(newBook => {
          if (!mergedResults.some(b => b.id === newBook.id)) {
            mergedResults.push(newBook);
          }
        });
        setCachedBooks(args.genre, args.search, {
          results: mergedResults,
          next: response.data.next,
        });
      } else {
        setCachedBooks(args.genre, args.search, {
          results: response.data.results,
          next: response.data.next,
        });
      }

      return {
        data: response.data,
        isNext: response.isNext,
        isOffline: false,
      };
    } catch (err: any) {
      console.error('Network request failed. Args:', args, 'Error:', err);
      const cached = getCachedBooks(args.genre, args.search);
      if (cached && cached.results.length > 0) {
        return {
          data: {
            count: cached.results.length,
            next: cached.next,
            previous: null,
            results: cached.results,
          },
          isNext: !!args.nextUrl,
          isOffline: true,
        };
      }
      return rejectWithValue(err.message || BOOK_STRINGS.failedToFetch);
    }
  },
);


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
      state.loading = true;
      state.error = null;
    },
    clearBooks(state) {
      state.books = [];
      state.nextUrl = null;
      state.loading = true;
      state.error = null;
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
        state.isOffline = action.payload.isOffline;
        state.nextUrl = action.payload.isOffline ? null : action.payload.data.next;
        if (action.payload.isNext && !action.payload.isOffline) {
          state.books = [...state.books, ...action.payload.data.results];
        } else {
          state.books = action.payload.data.results;
        }
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.isOffline = true; // Fallback failed or offline
        state.error = action.payload as string;
      });
  },

});

export const { setSearchQuery, setSelectedGenre, clearBooks } =
  booksSlice.actions;
export default booksSlice.reducer;
