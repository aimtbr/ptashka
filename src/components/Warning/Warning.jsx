import React, { useState, useEffect } from 'react';

import { Button } from '/src/components';

import './styles.scss';

const Warning = (props) => {
  const { message, isVisible, hideWarning } = props;

  const initialCounter = 10;

  const [counter, setCounter] = useState(initialCounter);

  useEffect(() => {
    if (isVisible) {
      startCounter();
    }
  }, [isVisible]);

  const startCounter = () => {
    const delay = 1000; // 1 sec
    const deadline = 0;
    const step = -1;

    let nextCounter = initialCounter;

    const intervalId = setInterval(() => {
      nextCounter = nextCounter + step;

      setCounter(nextCounter);

      if (nextCounter === deadline) {
        hideWarning();

        resetCounter();

        clearInterval(intervalId);
      }
    }, delay);
  };

  const resetCounter = () => {
    setCounter(initialCounter);
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
