import React, { useState, useEffect } from 'react';

import { Button } from '../../../components';

import './styles.scss';

const Warning = (props) => {
  const initialMessage = '';
  const initialCounter = 1000;

  // TODO: fix the counter not being reset

  const { message = initialMessage, setMessage } = props;

  const [counter, setCounter] = useState(initialCounter);

  const isMessageExists = message.length > 0;

  useEffect(() => {
    if (isMessageExists) {
      startCounter();
    }
  }, [message]);

  const startCounter = () => {
    const delay = 1000; // 1 sec

    let nextCounter = counter;

    const intervalId = setInterval(() => {
      if (nextCounter <= 1) {
        resetWarning();
        resetCounter();

        clearInterval(intervalId);
      }

      nextCounter = nextCounter - 1;

      setCounter(nextCounter);
    }, delay);
  };

  const resetWarning = () => {
    setMessage(initialMessage);
  };

  const resetCounter = () => {
    setCounter(initialCounter);
  };

  return isMessageExists ? (
    <div className="home-body-warning">
      <div className="home-body-warning__message">{message}</div>
      <Button
        className="home-body-warning__button"
        type="button"
        onClick={resetWarning}
      >
        {counter}
      </Button>
    </div>
  ) : null;
};

export default Warning;
