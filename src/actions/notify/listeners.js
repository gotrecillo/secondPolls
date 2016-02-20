import { SET_NOTIFICATIONS } from './action-types';
// import { addNotification } from '../notify/actions';

export function registerListeners() {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const userId = auth.id;
    const ref = firebase.child(`myNotifications/${userId}`);

    ref.on('value', snapshot => {
      const notifications = snapshot.val() || [];
      dispatch({
        type: SET_NOTIFICATIONS,
        notifications
      });
    });
  };
}

export function unregisterListeners() {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const userId = auth.id;
    const ref = firebase.child(`myNotifications/${userId}`);
    ref.off();
    dispatch({
      type: SET_NOTIFICATIONS,
      notifications: []
    });
  };
}
