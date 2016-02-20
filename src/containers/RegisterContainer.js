import { connect } from 'react-redux';
import Register from '../components/Register';
import * as authActions from '../actions/auth';

export default connect(
  state => state.auth,
  authActions
)(Register);
