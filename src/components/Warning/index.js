import { connect } from 'react-redux';

import { default as WarningComponent } from './Warning.jsx';
import { showWarning, hideWarning } from '/src/store/actions/warning.js';

const mapStateToProps = (state) => ({
  message: state.warning.message,
  isVisible: state.warning.isVisible,
});

const mapDispatchToProps = (dispatch) => ({
  showWarning: () => dispatch(showWarning()),
  hideWarning: () => dispatch(hideWarning()),
});

export const Warning = connect(
  mapStateToProps,
  mapDispatchToProps
)(WarningComponent);
