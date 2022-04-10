import React, { useEffect } from 'react';

import { Home } from '../pages';
import { Warning, ConnectionStatus } from '../components';
import { generators } from '../lib';

const App = (props) => {
  const { localeCode } = props;

  useEffect(async () => {
    const manifestURL = generators.generateManifest({ lang: localeCode });

    return () => {
      URL.revokeObjectURL(manifestURL);
    };
  }, [localeCode]);

  return (
    <div className="app">
      <ConnectionStatus />
      <Warning />
      <Home />
    </div>
  );
};

export default App;
