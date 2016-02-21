import { SET_VOTED_STATUS } from '../actions/pollDetails';

export default function notifyReducer(state = '', action) {
  switch (action.type) {
    case SET_VOTED_STATUS:
      return action.entry;
    default:
      return state;
  }
}
