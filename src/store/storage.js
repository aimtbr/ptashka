import localforage from 'localforage';

import config from '/config';

// configure a localforage
localforage.config({
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
  name: config.name,
  storeName: 'appStore',
});

export const storage = localforage;

export const composePersistConfig = (config) => {
  const configExtended = {
    storage,
    ...config,
  };

  return configExtended;
};
