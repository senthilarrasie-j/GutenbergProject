import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import booksReducer from '@/features/books/store';

import { BooksState } from '@/features/books/types';

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
