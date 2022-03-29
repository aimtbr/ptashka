import { connect } from 'react-redux';

import BodyComponent from './Body.jsx';
import { setWarningMessageAndShow } from '/src/store/actions/warning.js';

const mapDispatchToProps = (dispatch) => ({
  setWarning: (message) => dispatch(setWarningMessageAndShow(message)),
});

export const Body = connect(null, mapDispatchToProps)(BodyComponent);
