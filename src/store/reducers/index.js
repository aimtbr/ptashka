import { combineReducers } from 'redux';

import { LOCALE_UA } from '../../lib/constants.js';
import { appTypes } from '../actions';
import { persistReducerExtended } from '../storage.js';

const persistConfig = {
  key: 'app',
  version: 1,
};

const initialState = {
  locale: LOCALE_UA,
};

const reducers = combineReducers({});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case appTypes.APP_RESET: {
      state = undefined;

      break;
    }

    default: {
      return state;
    }
  }

  return reducers(state, action);
};

export default persistReducerExtended(persistConfig, reducer);
