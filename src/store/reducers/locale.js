import { persistReducer } from 'redux-persist';

import { composePersistConfig } from '../storage.js';
import { LOCALE_UA } from '../../lib/constants.js';
import { localeTypes } from '../actions';

const { language, country, code } = LOCALE_UA;

const persistConfig = composePersistConfig({
  key: 'locale',
  version: 1,
});

const initialState = {
  language,
  country,
  code,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case localeTypes.SET_LOCALE: {
      const { language, country, code } = action.locale;

      return { ...state, language, country, code };
    }

    case localeTypes.RESET_LOCALE: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default persistReducer(persistConfig, reducer);
