import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';
import App from './App';

import 'normalize.css';
import '/assets/styles';

const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => console.log('Service Worker registration succeeded.'))
        .catch(() => console.error('Service Worker registration failed.'));
    });
  }
};

const app = (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
const container = document.getElementById('root');

render(app, container);

registerServiceWorker();
