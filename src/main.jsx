import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Home } from './pages';
import { Warning, ConnectionStatus } from './components';
import { store, persistor } from './store';

import 'normalize.css';
import '/assets/styles';

const app = (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <div className="app">
        <ConnectionStatus />
        <Warning />
        <Home />
      </div>
    </PersistGate>
  </Provider>
);

const container = document.getElementById('root');

render(app, container);

// TODO: refactor below
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => console.log('Service Worker registration succeeded.'))
      .catch(() => console.error('Service Worker registration failed.'));
  });
}
