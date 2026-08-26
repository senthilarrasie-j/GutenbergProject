import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from '@/services/i18n/locales/en.json';
import es from '@/services/i18n/locales/es.json';
import hi from '@/services/i18n/locales/hi.json';
import ta from '@/services/i18n/locales/ta.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  hi: { translation: hi },
  ta: { translation: ta },
};

// Fallback to English if device locale is not supported
const fallback = { languageTag: 'en', isRTL: false };
const { languageTag } = RNLocalize.findBestLanguageTag(Object.keys(resources)) || fallback;

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    lng: languageTag,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
