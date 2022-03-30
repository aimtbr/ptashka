import { warningTypes } from './types.js';

const setWarningMessage = (message) => ({
  type: warningTypes.WARNING_SET_MESSAGE,
  message,
});

const showWarning = () => ({
  type: warningTypes.WARNING_SHOW,
});

const hideWarning = () => ({
  type: warningTypes.WARNING_HIDE,
});

const showWarningMessage = (message) => {
  return async (dispatch) => {
    dispatch(setWarningMessage(message));
    dispatch(showWarning());
  };
};

export { setWarningMessage, showWarning, hideWarning, showWarningMessage };
