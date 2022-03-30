import { connect } from 'react-redux';

import BodyComponent from './Body.jsx';
import { showWarningMessage } from '/src/store/actions/warning.js';

const mapDispatchToProps = (dispatch) => ({
  showWarningMessage: (message) => dispatch(showWarningMessage(message)),
});

export const Body = connect(null, mapDispatchToProps)(BodyComponent);
