import { getCacheKey, getCachedBooks, setCachedBooks, clearAllCache } from '@/features/books/services/storage';

// Pull the mock storage ref
const mmkv = require('react-native-mmkv');
const mockStorage = mmkv.__mockStorage;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getCacheKey', () => {
  it('generates key with prefix, genre, search', () => {
    const key = getCacheKey('Fiction', 'hamlet');
    expect(key).toBe('books_cache_fiction_hamlet');
  });

  it('lowercases and trims search', () => {
    expect(getCacheKey('Drama', '  HAMLET  ')).toBe('books_cache_drama_hamlet');
  });

  it('uses empty string for search by default', () => {
    expect(getCacheKey('History')).toBe('books_cache_history_');
  });
});

describe('getCachedBooks', () => {
  const mockData = { results: [{ id: 1, title: 'Moby Dick' }], next: null };

  it('returns parsed data when key exists', () => {
    mockStorage.getString.mockReturnValue(JSON.stringify(mockData));
    const result = getCachedBooks('fiction', '');
    expect(result).toEqual(mockData);
  });

  it('returns null when key does not exist', () => {
    mockStorage.getString.mockReturnValue(undefined);
    const result = getCachedBooks('fiction', '');
    expect(result).toBeNull();
  });

  it('returns null on JSON parse error', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockStorage.getString.mockReturnValue('not-valid-json{{{');
    const result = getCachedBooks('fiction', '');
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });

  it('calls getString with correct key', () => {
    mockStorage.getString.mockReturnValue(null);
    getCachedBooks('Drama', 'test');
    expect(mockStorage.getString).toHaveBeenCalledWith('books_cache_drama_test');
  });
});

describe('setCachedBooks', () => {
  it('serializes and stores data', () => {
    const data = { results: [], next: 'https://next.url' };
    setCachedBooks('fiction', 'hamlet', data);
    expect(mockStorage.set).toHaveBeenCalledWith(
      'books_cache_fiction_hamlet',
      JSON.stringify(data),
    );
  });

  it('calls set with correct key', () => {
    setCachedBooks('History', '', { results: [], next: null });
    expect(mockStorage.set).toHaveBeenCalledWith(
      'books_cache_history_',
      JSON.stringify({ results: [], next: null }),
    );
  });

  it('does not throw when set throws', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockStorage.set.mockImplementationOnce(() => { throw new Error('MMKV error'); });
    expect(() => setCachedBooks('fiction', '', { results: [], next: null })).not.toThrow();
    consoleSpy.mockRestore();
  });
});

describe('clearAllCache', () => {
  it('calls storage.clearAll', () => {
    clearAllCache();
    expect(mockStorage.clearAll).toHaveBeenCalledTimes(1);
  });

  it('does not throw when clearAll throws', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockStorage.clearAll.mockImplementationOnce(() => { throw new Error('fail'); });
    expect(() => clearAllCache()).not.toThrow();
    consoleSpy.mockRestore();
  });
});
