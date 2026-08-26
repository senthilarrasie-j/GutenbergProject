import { BOOK_STRINGS } from '@/features/books/constants';
import i18n from '@/services/i18n';

describe('BOOK_STRINGS', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('translates dynamically when language changes', async () => {
    await i18n.changeLanguage('es');
    expect(BOOK_STRINGS.searchPlaceholder).toBe('Buscar');
    expect(BOOK_STRINGS.errorTitle).toBe('Error');

    await i18n.changeLanguage('hi');
    expect(BOOK_STRINGS.searchPlaceholder).toBe('खोजें');
    expect(BOOK_STRINGS.errorTitle).toBe('त्रुटि');

    await i18n.changeLanguage('ta');
    expect(BOOK_STRINGS.searchPlaceholder).toBe('தேடு');
    expect(BOOK_STRINGS.errorTitle).toBe('பிழை');

    await i18n.changeLanguage('en');
    expect(BOOK_STRINGS.searchPlaceholder).toBe('Search');
    expect(BOOK_STRINGS.errorTitle).toBe('Error');
  });

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
