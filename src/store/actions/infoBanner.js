import { infoBannerTypes } from './types.js';

const setInfoBannerMessage = (message) => ({
  type: infoBannerTypes.INFO_BANNER_SET_MESSAGE,
  message,
});

const showInfoBanner = () => ({
  type: infoBannerTypes.INFO_BANNER_SHOW,
});

const hideInfoBanner = () => ({
  type: infoBannerTypes.INFO_BANNER_HIDE,
});

const refreshInfoBanner = () => {
  return async (dispatch, getState) => {
    const { infoBanner } = getState();

    const { message: infoBannerMessagePrev } = infoBanner;
    const { INFO_BANNER_MESSAGE: infoBannerMessageCurrent } = process.env;

    if (infoBannerMessagePrev !== infoBannerMessageCurrent) {
      dispatch(setInfoBannerMessage(infoBannerMessageCurrent));
      dispatch(showInfoBanner());
    }
  };
};

export {
  setInfoBannerMessage,
  showInfoBanner,
  hideInfoBanner,
  refreshInfoBanner,
};
