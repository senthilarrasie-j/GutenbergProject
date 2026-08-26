import i18n from '@/services/i18n';

export const BOOK_STRINGS = {
  get headerTitle() { return i18n.t('headerTitle'); },
  get headerSubtitle() { return i18n.t('headerSubtitle'); },
  get searchPlaceholder() { return i18n.t('searchPlaceholder'); },
  get noBooksFound() { return i18n.t('noBooksFound'); },
  get unknownAuthor() { return i18n.t('unknownAuthor'); },
  get errorTitle() { return i18n.t('errorTitle'); },
  get errorOpenLink() { return i18n.t('errorOpenLink'); },
  get errorNoVersion() { return i18n.t('errorNoVersion'); },
  baseUrl: "https://gutendex.careers.ignitesol.com/books",
  get failedToFetch() { return i18n.t('failedToFetch'); },
  get noConnection() { return i18n.t('noConnection'); },
};

