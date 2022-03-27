import { combineReducers } from 'redux';

import { appTypes } from '../actions';

import locale from './locale.js';
import warning from './warning.js';

const reducers = combineReducers({ locale, warning });

const reducer = (state, action) => {
  switch (action.type) {
    case appTypes.APP_RESET: {
      state = undefined;

      break;
    }

    default: {
      return reducers(state, action);
    }
  }
};

export default reducer;
