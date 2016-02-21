import { pushState } from 'redux-router';
import { INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SIGN_IN_FAIL, REGISTER_FAIL } from './action-types.js';
import { tokens } from '../../utils/tokens';
import FirebaseTokenGenerator from "firebase-token-generator";

const appSecret = 'sRhN4rw1LfRCN8BXS5zCNpo3odJAWhTvLXXT8edk';
const tokenGenerator = new FirebaseTokenGenerator(appSecret);

export function authenticate(user) {
  return (dispatch, getState) => {
    const { firebase } = getState();

    dispatch(pushState(null, '/'));

    firebase.authWithCustomToken(tokens[user], (error, authData) => {
      if (error) {
        console.error('ERROR @ authWithCustomToken :', error); // eslint-disable-line no-console
      }
      else {
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: authData,
          meta: {
            timestamp: Date.now()
          }
        });
      }
    });
  };
}

export function createUser(user, password){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child(`users/${user}`);
    ref.once('value', snap => {
      if (snap.exists()){
        dispatch({
          type: REGISTER_FAIL,
          text: 'Username already in use'
        });
      } else {
        ref.set({ password}).then(error => {
          if (error) {
            console.log("Register failed", error);
          } else {
            logIn(user, password)(dispatch, getState);
          }
        });
      }
    });
  };
}

export function logIn(user, password){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child(`users/${user}`);
    ref.once('value', snap => {
      if (snap.exists()  &&   snap.val().password === password){
        const token = tokenGenerator.createToken({ uid: user, provider: "custom" }, { expires: 9999999999999 });
        firebase.authWithCustomToken(token, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Login Succeeded!", authData);
            dispatch({
              type: INIT_AUTH,
              payload: firebase.getAuth(),
              meta: {
                timestamp: Date.now()
              }
            });
            dispatch(pushState(null, '/poll'));
          }
        });
      } else {
        dispatch({
          type: SIGN_IN_FAIL
        });
        console.log('no me la cueles');
      }
    });
  };
}


export function initAuth() {
  return (dispatch, getState) => {
    const { firebase } = getState();
    dispatch({
      type: INIT_AUTH,
      payload: firebase.getAuth(),
      meta: {
        timestamp: Date.now()
      }
    });
  };
}

export function signOut() {
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.unauth();
    dispatch(pushState(null, '/'));
    dispatch({
      type: SIGN_OUT_SUCCESS
    });
  };
}


export function cancelSignIn() {
  return dispatch => {
    return dispatch(pushState(null, '/'));
  };
}
