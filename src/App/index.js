import { connect } from 'react-redux';

import AppComponent from './App.jsx';

const mapStateToProps = (state) => ({
  localeCode: state.locale.code,
});

export default connect(mapStateToProps)(AppComponent);
