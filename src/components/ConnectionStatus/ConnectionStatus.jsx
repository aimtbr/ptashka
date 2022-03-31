import React, { useState, useMemo, useEffect } from 'react';

import {
  CONNECTION_STATUS_ONLINE,
  CONNECTION_STATUS_OFFLINE,
} from '/src/lib/constants.js';

import './styles.scss';

// TODO: stop all ptashkas when going offline

const ConnectionStatus = () => {
  const defaultClassName = 'connection-status';

  const [isVisible, setVisible] = useState(false);
  const [status, setStatus] = useState(CONNECTION_STATUS_ONLINE);

  useEffect(() => {
    window.addEventListener('online', function (e) {
      const hideIn = 5000;

      setOnline();

      setTimeout(hideConnectionStatus, hideIn);
    });

    window.addEventListener('offline', function (e) {
      setOffline();

      showConnectionStatus();
    });

    return () => {
      window.removeEventListener('online');
      window.removeEventListener('offline');
    };
  }, []);

  useEffect(() => {
    const isOnline = status === CONNECTION_STATUS_ONLINE;

    if (isOnline) {
    }
  }, [status]);

  const className = useMemo(() => {
    const modifiers = {
      [CONNECTION_STATUS_ONLINE]: 'online',
      [CONNECTION_STATUS_OFFLINE]: 'offline',
    };

    const modifier = modifiers[status];

    const modifiedClassName = `${defaultClassName}_${modifier}`;

    const classNames = [defaultClassName, modifiedClassName].join(' ');

    return classNames;
  }, [status]);

  const setOnline = () => setStatus(CONNECTION_STATUS_ONLINE);

  const setOffline = () => setStatus(CONNECTION_STATUS_OFFLINE);

  const showConnectionStatus = () => setVisible(true);

  const hideConnectionStatus = () => setVisible(false);

  return isVisible ? (
    <div className={className}>
      <div className={`${defaultClassName}-content`}>{status}</div>
    </div>
  ) : null;
};

export default ConnectionStatus;
