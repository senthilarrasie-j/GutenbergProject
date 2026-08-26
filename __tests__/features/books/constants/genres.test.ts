import { BOOK_GENRES, GENRE_ICONS } from '@/features/books/constants';

describe('BOOK_GENRES', () => {
  it('has 7 genres', () => {
    expect(BOOK_GENRES).toHaveLength(7);
  });

  it('each genre has id, title, query', () => {
    BOOK_GENRES.forEach(genre => {
      expect(genre).toHaveProperty('id');
      expect(genre).toHaveProperty('title');
      expect(genre).toHaveProperty('query');
    });
  });

  it('ids are unique', () => {
    const ids = BOOK_GENRES.map(g => g.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('titles are unique', () => {
    const titles = BOOK_GENRES.map(g => g.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('contains Fiction genre', () => {
    expect(BOOK_GENRES.some(g => g.title === 'Fiction')).toBe(true);
  });

  it('queries are lowercase', () => {
    BOOK_GENRES.forEach(g => {
      expect(g.query).toBe(g.query.toLowerCase());
    });
  });
});

describe('GENRE_ICONS', () => {
  it('is a record with string keys and emoji values', () => {
    expect(typeof GENRE_ICONS).toBe('object');
    Object.values(GENRE_ICONS).forEach(v => {
      expect(typeof v).toBe('string');
    });
  });

  it('has icon for fiction', () => {
    expect(GENRE_ICONS.fiction).toBeDefined();
  });

  it('has icon for drama', () => {
    expect(GENRE_ICONS.drama).toBeDefined();
  });

  it('keys match genre queries from BOOK_GENRES', () => {
    BOOK_GENRES.forEach(g => {
      expect(GENRE_ICONS[g.query]).toBeDefined();
    });
  });
});
