import * as authActions from '../actions/auth';

export default function authReducer(state = '', action) {
  switch (action.type) {
    case authActions.REGISTER_FAIL:
      return action.text;
    default:
      return state;
  }
}
