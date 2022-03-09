import { combineReducers } from 'redux';

import { LANGUAGE_EN } from '../../lib/constants.js';
import { appTypes } from '../actions';
import { persistReducerExtended } from '../storage.js';

const persistConfig = {
  key: 'app',
  version: 1,
};

const initialState = {
  localization: LANGUAGE_EN,
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
