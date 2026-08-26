export const findBestLanguageTag = (languages) => ({
  languageTag: 'en',
  isRTL: false,
});

export const getLocales = () => [
  { countryCode: 'US', languageTag: 'en', languageCode: 'en', isRTL: false },
];

export const getNumberFormatSettings = () => ({
  decimalSeparator: '.',
  groupingSeparator: ',',
});

export const getCalendar = () => 'gregorian';
export const getCountry = () => 'US';
export const getCurrencies = () => ['USD'];
export const getTemperatureUnit = () => 'celsius';
export const getTimeZone = () => 'America/New_York';
export const uses24HourClock = () => true;
export const usesMetricSystem = () => true;

export const addEventListener = () => {};
export const removeEventListener = () => {};
