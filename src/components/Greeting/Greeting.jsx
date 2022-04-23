import React, { useState, useEffect } from 'react';

import './styles.scss';

const TIME_OF_DAY_NIGHTTIME = 'nighttime';
const TIME_OF_DAY_MORNING = 'morning';
const TIME_OF_DAY_DAYTIME = 'daytime';
const TIME_OF_DAY_EVENING = 'evening';

const NIGHTTIME_RANGE_START = 0;
const NIGHTTIME_RANGE_END = 6;
const NIGHTTIME_RANGE = [NIGHTTIME_RANGE_START, NIGHTTIME_RANGE_END];
const NIGHTTIME_GREETING = '🌙 Доброї ночі!';

const MORNING_RANGE_START = 6;
const MORNING_RANGE_END = 12;
const MORNING_RANGE = [MORNING_RANGE_START, MORNING_RANGE_END];
const MORNING_GREETING = '⛅ Доброго ранку!';

const DAYTIME_RANGE_START = 12;
const DAYTIME_RANGE_END = 18;
const DAYTIME_RANGE = [DAYTIME_RANGE_START, DAYTIME_RANGE_END];
const DAYTIME_GREETING = '☀️ Доброго дня!';

const EVENING_RANGE_START = 18;
const EVENING_RANGE_END = 24;
const EVENING_RANGE = [EVENING_RANGE_START, EVENING_RANGE_END];
const EVENING_GREETING = '✨ Доброго вечора!';

const timesOfDay = {
  [TIME_OF_DAY_NIGHTTIME]: {
    range: NIGHTTIME_RANGE,
    greeting: NIGHTTIME_GREETING,
  },
  [TIME_OF_DAY_MORNING]: {
    range: MORNING_RANGE,
    greeting: MORNING_GREETING,
  },
  [TIME_OF_DAY_DAYTIME]: {
    range: DAYTIME_RANGE,
    greeting: DAYTIME_GREETING,
  },
  [TIME_OF_DAY_EVENING]: {
    range: EVENING_RANGE,
    greeting: EVENING_GREETING,
  },
};

const Greeting = (props) => {
  const { baseClassName = '' } = props;

  const defaultClassName = 'greeting';

  const className = `${baseClassName}-${defaultClassName}`;
  const classNames = [defaultClassName, className].join(' ');

  const currentDate = new Date();

  const getTimeOfDay = () => {
    // TODO: localize
    const hours = currentDate.getHours();

    let timeOfDay;
    for (timeOfDay in timesOfDay) {
      const [timeOfDayStart, timeOfDayEnd] = timesOfDay[timeOfDay].range;

      const isInRange = hours >= timeOfDayStart && hours < timeOfDayEnd;

      if (isInRange) {
        return timeOfDay;
      }
    }
  };

  const initialTimeOfDay = getTimeOfDay();

  const [currentTimeOfDay, setTimeOfDay] = useState(initialTimeOfDay);

  const { greeting } = timesOfDay[currentTimeOfDay];

  useEffect(() => {
    scheduleNextTimeOfDay();
  }, [currentTimeOfDay]);

  const scheduleNextTimeOfDay = () => {
    let nextTimeOfDay = TIME_OF_DAY_MORNING;

    const currentDateHours = currentDate.getHours();
    const currentDateMinutes = currentDate.getMinutes();
    const currentDateSeconds = currentDate.getSeconds();

    switch (currentTimeOfDay) {
      case TIME_OF_DAY_NIGHTTIME: {
        nextTimeOfDay = TIME_OF_DAY_MORNING;
        break;
      }

      case TIME_OF_DAY_MORNING: {
        nextTimeOfDay = TIME_OF_DAY_DAYTIME;
        break;
      }

      case TIME_OF_DAY_DAYTIME: {
        nextTimeOfDay = TIME_OF_DAY_EVENING;
        break;
      }

      case TIME_OF_DAY_EVENING: {
        nextTimeOfDay = TIME_OF_DAY_NIGHTTIME;
        break;
      }
    }

    const [nextTimeOfDayRangeStart] = timesOfDay[nextTimeOfDay].range;

    const nextTimeOfDayStartsInHours =
      (nextTimeOfDayRangeStart === 0 ? 24 : nextTimeOfDayRangeStart) - currentDateHours - 1;
    const nextTimeOfDayStartsInMinutes = 59 - currentDateMinutes;
    const nextTimeOfDayStartsInSeconds = 60 - currentDateSeconds;

    const hoursDelay = nextTimeOfDayStartsInHours * 60 * 60 * 1000;
    const minutesDelay = nextTimeOfDayStartsInMinutes * 60 * 1000;
    const secondsDelay = nextTimeOfDayStartsInSeconds * 1000;

    const refreshDelay = hoursDelay + minutesDelay + secondsDelay;

    setTimeout(() => {
      setTimeOfDay(nextTimeOfDay);
    }, refreshDelay);
  };

  return <div className={classNames}>{greeting}</div>;
};

export default Greeting;
