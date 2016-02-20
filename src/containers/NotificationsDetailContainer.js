import { connect } from 'react-redux';
import * as notifyActions from '../actions/notify';

import NotificationsDetail from '../components/NotificationsDetail';

export default connect(
	state => ({messages: state.messages, auth: state.auth}),
	notifyActions
)(NotificationsDetail);
