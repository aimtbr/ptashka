import { ENV_PRODUCTION } from './constants.js';

export const isProduction = process.env.NODE_ENV === ENV_PRODUCTION;

export const domainToPattern = (domain) => {
  const domainPattern = domain.replaceAll('.', '\\.');

  const pattern = new RegExp(`^https?:\/\/(\w+\.)*${domainPattern}\/?$`);

  return pattern;
};
