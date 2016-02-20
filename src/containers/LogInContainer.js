import { connect } from 'react-redux';
import LogIn from '../components/LogIn';
import * as authActions from '../actions/auth';

export default connect(
  state => state.auth,
  authActions
)(LogIn);