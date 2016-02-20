import { SET_NOTIFICATIONS } from '../actions/notify';

function setNotifications(notifications) {
  return [].concat(Object.values(notifications));
}

export default function notifyReducer(state = [], action) {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return setNotifications(action.notifications);
    default:
      return state;
  }
}
