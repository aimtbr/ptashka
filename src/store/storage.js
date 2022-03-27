import localforage from 'localforage';
import { persistReducer } from 'redux-persist';

// configure a localforage
localforage.config({
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
  name: process.env.APP_TITLE,
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
