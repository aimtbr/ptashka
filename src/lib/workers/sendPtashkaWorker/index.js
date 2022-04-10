import { RESOURCES_LIMIT } from './constants.js';
import { errorWorkerUnavailable, errorResourceExists } from '../../errors.js';
// import { sendPtashka } from '../../scripts';

const resources = [];

const isResourceExists = (resource) => resources.includes(resource);
const isWorkerOverloaded = () => resources.length === RESOURCES_LIMIT;

const tracking = {
  resource: '',
  sentPtashkas: 0,
  startedAt: Date.now(),
};

onmessage = (event) => {
  try {
    if (isWorkerOverloaded()) {
      throw errorWorkerUnavailable();
    }

    const targetResource = event.data;

    if (isResourceExists(targetResource)) {
      throw errorResourceExists(targetResource);
    }

    sendPtashka(targetResource);
  } catch (error) {
    throw new Error(error);
  }
};
