import { persistReducer } from 'redux-persist';

import { composePersistConfig } from '../storage.js';
import { warningTypes } from '../actions';

const persistConfig = composePersistConfig({
  key: 'warning',
  version: 1,
  whitelist: [],
});

const initialState = {
  message: '',
  isVisible: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case warningTypes.SET_MESSAGE: {
      const { message } = action;

      return { ...state, message };
    }

    case warningTypes.SHOW_WARNING: {
      return { ...state, isVisible: true };
    }

    case warningTypes.HIDE_WARNING: {
      return { ...state, isVisible: false };
    }

    default: {
      return state;
    }
  }
};
export default persistReducer(persistConfig, reducer);
