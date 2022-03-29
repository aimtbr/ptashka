import { persistReducer } from 'redux-persist';

import { composePersistConfig } from '../storage.js';
import { infoBannerTypes } from '../actions';

const persistConfig = composePersistConfig({
  key: 'infoBanner',
  version: 1,
});

const initialState = {
  message: process.env.INFO_BANNER_MESSAGE,
  isVisible: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case infoBannerTypes.INFO_BANNER_SET_MESSAGE: {
      const { message } = action;

      return { ...state, message };
    }

    case infoBannerTypes.INFO_BANNER_SHOW: {
      return { ...state, isVisible: true };
    }

    case infoBannerTypes.INFO_BANNER_HIDE: {
      return { ...state, isVisible: false };
    }

    default: {
      return state;
    }
  }
};

export default persistReducer(persistConfig, reducer);
