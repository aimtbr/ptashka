import { ENV_PRODUCTION } from './constants.js';

export const isProduction = process.env.NODE_ENV === ENV_PRODUCTION;

export const domainToPattern = (domain) => {
  const domainPattern = domain.replaceAll('.', '\\.');

  const pattern = new RegExp(`^https?:\/\/(\w+\.)*${domainPattern}\/?$`);

  return pattern;
};

export const throttle = () => {
  // TODO: implement
};

export const setCustomInterval = (func, delay, leading = false, ...args) => {
  const isLeading = leading === true;
  if (isLeading) {
    func(...args);
  }

  const intervalId = setInterval(func, delay, ...args);

  return intervalId;
};
