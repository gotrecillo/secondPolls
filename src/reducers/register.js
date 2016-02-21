import * as authActions from '../actions/auth';
import { ROUTER_DID_CHANGE } from 'redux-router/lib/constants';

export default function authReducer(state = '', action) {
  switch (action.type) {
    case authActions.REGISTER_FAIL:
      return action.text;
    case ROUTER_DID_CHANGE:
      return '';
    default:
      return state;
  }
}
