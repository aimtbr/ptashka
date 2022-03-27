import { warningTypes } from './types.js';

const setMessage = (message) => ({
  type: warningTypes.SET_MESSAGE,
  message,
});

const showWarning = () => ({
  type: warningTypes.SHOW_WARNING,
});

const hideWarning = () => ({
  type: warningTypes.HIDE_WARNING,
});

const setMessageAndShow = (message) => {
  return async (dispatch) => {
    dispatch(setMessage(message));
    dispatch(showWarning());
  };
};

export { setMessage, setMessageAndShow, showWarning, hideWarning };
