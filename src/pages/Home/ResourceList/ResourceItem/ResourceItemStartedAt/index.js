import { connect } from 'react-redux';

import ResourceItemStartedAt from './ResourceItemStartedAt.jsx';

const mapStateToProps = (state) => ({
  locale: state.locale,
});

export default connect(mapStateToProps, null, null)(ResourceItemStartedAt);
