import { WORKER_UNAVAILABLE, RESOURCE_EXISTS } from './constants.js';

const composeError = (type, message) => {
  const error = { type, message };

  return (...params) => {
    
  };
};

export const errorWorkerUnavailable = composeError(() => ({
  type: WORKER_UNAVAILABLE,
}));

export const errorResourceExists = composeError(RESOURCE_EXISTS, '', );

export const 
