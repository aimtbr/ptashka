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

// MIN/MAX VALUES
export const URL_MIN_LENGTH = 10;
export const URL_MAX_LENGTH = 1024;

export const RESOURCE_LIST_MAX_LENGTH = 3;

// PTASHKA
export const PTASHKA_STATUS_READY = 'Готовий';
export const PTASHKA_STATUS_RUNNING = 'Працює';
export const PTASHKA_STATUS_PAUSED = 'Призупинений';

// CONNECTION STATUSES
// TODO: assign a message to constants
export const CONNECTION_STATUS_ONLINE = 'Відновлено з’єднання з Інтернетом!';
export const CONNECTION_STATUS_OFFLINE = 'Втрачено з’єднання з Інтернетом...';
