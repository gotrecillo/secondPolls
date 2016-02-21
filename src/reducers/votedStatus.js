import { SET_VOTED_STATUS } from '../actions/pollDetails';

export default function notifyReducer(state = true, action) {
  switch (action.type) {
    case SET_VOTED_STATUS:
      return action.status;
    default:
      return state;
  }
}
