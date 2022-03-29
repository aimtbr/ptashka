import { connect } from 'react-redux';

import InfoBannerComponent from './InfoBanner.jsx';
import {
  refreshInfoBanner,
  hideInfoBanner,
} from '/src/store/actions/infoBanner.js';

const mapStateToProps = (state) => ({
  ...state.infoBanner,
  localeCode: state.locale.code,
});

const mapDispatchToProps = (dispatch) => ({
  refreshInfoBanner: () => dispatch(refreshInfoBanner()),
  hideInfoBanner: () => dispatch(hideInfoBanner()),
});

export const InfoBanner = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoBannerComponent);
