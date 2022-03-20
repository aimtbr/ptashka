import { DEFAULT_LOCALE } from './constants.js';

export const dateToReadable = (date, locale = DEFAULT_LOCALE) => {
  const formatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  };

  const currentDate = new Date();
  const dateInstance = new Date(date);

  const isCurrentDay =
    dateInstance.toLocaleDateString() === currentDate.toLocaleDateString();
  const isCurrentYear =
    dateInstance.getFullYear() === currentDate.getFullYear();

  // if the day is the same as the current, then omit a date
  // otherwise check whether the year is the same, then omit a year
  if (isCurrentDay) {
    formatOptions.year = undefined;
    formatOptions.month = undefined;
    formatOptions.day = undefined;
  } else if (isCurrentYear) {
    formatOptions.year = undefined;
    formatOptions.month = 'short';
  }

  const { format } = new Intl.DateTimeFormat(locale, formatOptions);

  const dateReadable = format(dateInstance);

  return dateReadable;
};

export const localeToObject = (locale) => {
  const localeSeparator = '-';

  const [language, country] = locale.split(localeSeparator);

  const localeObject = {
    language,
    country,
    tag: locale,
  };

  return localeObject;
};
