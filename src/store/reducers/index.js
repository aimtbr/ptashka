import { combineReducers } from 'redux';

import { appTypes } from '../actions';

import locale from './locale.js';
import warning from './warning.js';
import infoBanner from './infoBanner.js';

const reducers = combineReducers({ locale, warning, infoBanner });

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
