import React, { useState, useEffect } from 'react';

import { Button } from '/src/components';

import './styles.scss';

const Warning = (props) => {
  const { message, isVisible, hideWarning } = props;

  const initialIntervalId = null;
  const initialCounter = 10;

  const [intervalId, setIntervalId] = useState(initialIntervalId);
  const [counter, setCounter] = useState(initialCounter);

  useEffect(() => {
    if (isVisible) {
      startCounter();
    } else {
      resetCounter();
    }
  }, [isVisible]);

  const startCounter = () => {
    const delay = 1000; // 1 sec
    const deadline = 0; // stop in 0 sec
    const step = -1;

    let nextCounter = initialCounter;

    const nextIntervalId = setInterval(() => {
      nextCounter = nextCounter + step;

      setCounter(nextCounter);

      if (nextCounter === deadline) {
        hideWarning();
      }
    }, delay);

    setIntervalId(nextIntervalId);
  };

  const resetCounter = () => {
    setCounter(initialCounter);

    resetIntervalId();
  };

  const resetIntervalId = () => {
    clearInterval(intervalId);

    setIntervalId(initialIntervalId);
  };

  return isVisible ? (
    <div className="home-body-warning">
      <div className="home-body-warning__message">{message}</div>
      <Button
        className="home-body-warning__button"
        type="button"
        onClick={hideWarning}
      >
        {counter}
      </Button>
    </div>
  ) : null;
};

export default Warning;
