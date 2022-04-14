import { connect } from 'react-redux';

import CellStartedAtComponent from './CellStartedAt.jsx';

const mapStateToProps = (state) => ({
  locale: state.locale,
});

export const CellStartedAt = connect(mapStateToProps)(CellStartedAtComponent);
