import { BOOK_STRINGS } from '@/features/books/constants';

describe('BOOK_STRINGS', () => {
  it('headerTitle defined', () => {
    expect(BOOK_STRINGS.headerTitle).toBeTruthy();
  });

  it('headerSubtitle defined', () => {
    expect(BOOK_STRINGS.headerSubtitle).toBeTruthy();
  });

  it('searchPlaceholder is Search', () => {
    expect(BOOK_STRINGS.searchPlaceholder).toBe('Search');
  });

  it('noBooksFound defined', () => {
    expect(BOOK_STRINGS.noBooksFound).toBeTruthy();
  });

  it('baseUrl starts with https', () => {
    expect(BOOK_STRINGS.baseUrl).toMatch(/^https:\/\//);
  });

  it('errorTitle is Error', () => {
    expect(BOOK_STRINGS.errorTitle).toBe('Error');
  });

  it('noConnection message defined', () => {
    expect(BOOK_STRINGS.noConnection).toBeTruthy();
  });

  it('failedToFetch defined', () => {
    expect(BOOK_STRINGS.failedToFetch).toBeTruthy();
  });

  it('errorOpenLink defined', () => {
    expect(BOOK_STRINGS.errorOpenLink).toBeTruthy();
  });

  it('errorNoVersion defined', () => {
    expect(BOOK_STRINGS.errorNoVersion).toBeTruthy();
  });
});
