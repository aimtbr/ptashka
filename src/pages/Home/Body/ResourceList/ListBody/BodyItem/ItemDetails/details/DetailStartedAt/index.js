import { connect } from 'react-redux';

import DetailStartedAtComponent from './DetailStartedAt.jsx';

const mapStateToProps = (state) => ({
  locale: state.locale,
});

export const DetailStartedAt = connect(mapStateToProps)(DetailStartedAtComponent);
