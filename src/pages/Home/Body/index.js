import { connect } from 'react-redux';

import { default as BodyComponent } from './Body.jsx';
import { setMessageAndShow } from '/src/store/actions/warning.js';

const mapDispatchToProps = (dispatch) => ({
  setWarning: (message) => dispatch(setMessageAndShow(message)),
});

export const Body = connect(null, mapDispatchToProps)(BodyComponent);
