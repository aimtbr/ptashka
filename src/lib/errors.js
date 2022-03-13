import { WORKER_UNAVAILABLE, RESOURCE_EXISTS } from './constants.js';

export const errorWorkerUnavailable = () => ({
  type: WORKER_UNAVAILABLE,
});

export const errorResourceExists = (resource) => ({
  type: RESOURCE_EXISTS,
  resource,
});
