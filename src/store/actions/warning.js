import { warningTypes } from './types.js';

const setWarningMessage = (message) => ({
  type: warningTypes.SET_MESSAGE,
  message,
});

const showWarning = () => ({
  type: warningTypes.SHOW_WARNING,
});

const hideWarning = () => ({
  type: warningTypes.HIDE_WARNING,
});

const setWarningMessageAndShow = (message) => {
  return async (dispatch) => {
    dispatch(setWarningMessage(message));
    dispatch(showWarning());
  };
};

export {
  setWarningMessage,
  setWarningMessageAndShow,
  showWarning,
  hideWarning,
};
