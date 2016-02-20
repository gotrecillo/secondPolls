import { NotifyLevels } from './constants';
import Firebase from 'firebase';

import {
  ADD_NOTIFICATION_ERROR,
  SET_NOTIFICATION_AS_READED_ERROR,
  REMOVE_NOTIFICATION_ERROR,
  REMOVE_ALL_NOTIFICATIONS_ERROR,
  SET_NOTIFICATIONS } from './action-types.js';

export function addNotification(text, level = NotifyLevels.INFO) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const ref = firebase.child(`myNotifications/${auth.id}`);
    const notificationId = ref.push().key();
    ref.update({[notificationId]: {
      id: notificationId,
      text,
      level,
      created: Firebase.ServerValue.TIMESTAMP,
      pending: true,
      isNew: true
    }}, error => {
      if (error) {
        console.error('ERROR @ addNotification :', error);
        dispatch({
          type: ADD_NOTIFICATION_ERROR,
          payload: error
        });
      }
    });
  };
}

export function setNotificationAsReaded(id) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const ref = firebase.child(`myNotifications/${auth.id}/${id}`);
    ref.transaction(message => Object.assign({}, message, message.pending ? {pending: false} : {isNew: false})
    , error => {
      if (error) {
        console.error('ERROR @ setNotificationAsReaded :', error);
        dispatch({
          type: SET_NOTIFICATION_AS_READED_ERROR,
          payload: error
        });
      }
    });
  };
}

export function removeNotification(id) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const ref = firebase.child(`myNotifications/${auth.id}/${id}`);
    ref.remove( error => {
      if (error) {
        console.error('ERROR @ removeNotification :', error);
        dispatch({
          type: REMOVE_NOTIFICATION_ERROR,
          payload: error
        });
      }
    });
  };
}

export function removeAllNotifications() {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const ref = firebase.child(`myNotifications/${auth.id}`);
    ref.remove( error => {
      if (error) {
        console.error('ERROR @ removeAllNotifications :', error);
        dispatch({
          type: REMOVE_ALL_NOTIFICATIONS_ERROR,
          payload: error
        });
      }
    });
  };
}

export const setNotifications = notifications => ({
  type: SET_NOTIFICATIONS,
  notifications
});
