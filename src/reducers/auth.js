import * as authActions from '../actions/auth';

export const initialState = {
  authenticated: false,
  id: null
};

export default function authReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case authActions.INIT_AUTH:
      const authenticated = payload !== null;
      return {
        authenticated,
        id: authenticated ? payload.uid : null
      };

    case authActions.SIGN_IN_SUCCESS:
      return {
        authenticated: true,
        id: payload.uid
      };

    case authActions.SIGN_OUT_SUCCESS:
      return {
        authenticated: false,
        id: null
      };

    case authActions.SIGN_IN_FAIL:
      return {
        authenticated: false,
        fail: true,
        id: null
      };
    default:
      return state;
  }
}
