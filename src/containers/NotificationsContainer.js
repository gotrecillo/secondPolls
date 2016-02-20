import { connect } from 'react-redux';

import Notifications from '../components/Notifications';
import * as notificatinosActions from '../actions/notify';

export default connect(
  state => ({total: state.messages.length, pending: state.messages.filter( message => message.pending ).length}),
  notificatinosActions
)(Notifications);
