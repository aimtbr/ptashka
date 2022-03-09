import { ENV_PRODUCTION } from './constants.js';

export const isProduction = process.env.NODE_ENV === ENV_PRODUCTION;
