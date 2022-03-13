import React, { useEffect, useState, useCallback } from 'react';

import './styles.scss';

const PtashkaItem = (props) => {
  const { item } = props;

  const [ptashka, setPtashka] = useState(item);

  const { url, sent, status, startedAt, pausedAt } = ptashka;

  useEffect(() => {
    ptashka.onchange((event) => {
      const ptashkaUpdated = { ...event.detail };

      setPtashka(ptashkaUpdated);
    });

    return () => {
      ptashka.pause();
    };
  }, []);

  const toggleState = () => {
    // DOESN'T WORK
    if (ptashka.isStatusPaused) {
      ptashka.resume();
    } else {
      // TODO: ERROR is not a function
      ptashka.pause();
    }
  };

  return (
    <li className="home-body-ptashka-list-item">
      <div className="home-body-ptashka-list-item__url">{url}</div>

      <div className="home-body-ptashka-list-item__sent">{sent}</div>

      <div className="home-body-ptashka-list-item__status">{status}</div>

      <div className="home-body-ptashka-list-item__started-at">{startedAt}</div>

      <button
        type="button"
        className="home-body-ptashka-list-item__state"
        onClick={toggleState}
      >
        {ptashka.isStatusPaused ? 'Resume' : 'Pause'}
      </button>

      {/* <div className="home-body-ptashka-list-item__paused-at">{pausedAt}</div> */}
    </li>
  );
};

export default PtashkaItem;
