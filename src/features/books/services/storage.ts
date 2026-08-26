import { createMMKV } from 'react-native-mmkv';
import { Book } from '@/features/books/types';

export const storage = createMMKV();


const CACHE_KEY_PREFIX = 'books_cache';

interface CachedData {
  results: Book[];
  next: string | null;
}

export const getCacheKey = (genre: string, search: string = ''): string => {
  return `${CACHE_KEY_PREFIX}_${genre.toLowerCase()}_${search.toLowerCase().trim()}`;
};

export const getCachedBooks = (genre: string, search: string = ''): CachedData | null => {
  try {
    const key = getCacheKey(genre, search);
    const json = storage.getString(key);
    if (json) {
      return JSON.parse(json) as CachedData;
    }
  } catch (err) {
    console.error('Error reading from MMKV:', err);
  }
  return null;
};

export const setCachedBooks = (genre: string, search: string = '', data: CachedData): void => {
  try {
    const key = getCacheKey(genre, search);
    storage.set(key, JSON.stringify(data));
  } catch (err) {
    console.error('Error writing to MMKV:', err);
  }
};

export const clearAllCache = (): void => {
  try {
    storage.clearAll();
  } catch (err) {
    console.error('Error clearing MMKV storage:', err);
  }
};
