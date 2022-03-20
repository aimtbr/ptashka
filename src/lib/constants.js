import { localeToObject } from './converters.js';

// NODE_ENV VALUES
export const ENV_PRODUCTION = 'production';
export const ENV_DEVELOPMENT = 'development';

// LOCALIZATION
export const LOCALE_UA = localeToObject('uk-UA');
export const LOCALE_EN = localeToObject('en-US');
export const DEFAULT_LOCALE = LOCALE_UA;

// ERROR TYPES
export const WORKER_UNAVAILABLE = 'WORKER_UNAVAILABLE';
export const RESOURCE_EXISTS = 'RESOURCE_EXISTS';

// LENGTH VALUES
export const LENGTH_MIN_URL = 10;
export const LENGTH_MAX_URL = 1024;

// PTASHKA
export const PTASHKA_STATUS_READY = 'ready';
export const PTASHKA_STATUS_RUNNING = 'running';
export const PTASHKA_STATUS_PAUSED = 'paused';
