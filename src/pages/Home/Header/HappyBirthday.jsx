import React, { useState } from 'react';

// TEMP
const HappyBirthday = () => {
  const [counter, setCounter] = useState(5);
  const [timer, setTimer] = useState(null);
  const [isMessageVisible, setMessageVisible] = useState(false);

  const handleHeartClick = () => {
    clearInterval(timer);

    setCounter((counter) => counter - 1);

    if (counter === 0) {
      showMessage();
    }

    setTimer(
      setTimeout(() => {
        setCounter(5);
      }, 2000)
    );
  };

  const showMessage = () => {
    setMessageVisible(true);
  };

  return (
    <>
      <div className="home-header-love" onClick={handleHeartClick}>
        💛
      </div>

      {isMessageVisible ? (
        <div className="home-header-message">
          <div className="home-header-message-text">
            З ДНЕМ НАРОДЖЕННЯ
            <br />
            <span className="home-header-message-text__beloved">НАСТЮ</span>
            <br />Я ТЕБЕ ДУЖЕ КОХАЮ, МОЯ ГАРНЮНЯ!
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HappyBirthday;
