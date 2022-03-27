import { connect } from 'react-redux';

import ItemCellStartedAt from './ItemCellStartedAt.jsx';

const mapStateToProps = (state) => ({
  locale: state.locale,
});

export default connect(mapStateToProps, null, null)(ItemCellStartedAt);
