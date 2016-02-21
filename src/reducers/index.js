import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import polls from './poll';
import pollDetails from './pollDetails';
import pollSearch from './pollSearch';
import messages from './notify';
import actionsPending from './confirm';
import menu from './menu';
import firebase from './firebase';
import auth from './auth';
import votedStatus from './votedStatus';
import register from './register';

const pollApp = combineReducers({
  auth,
  polls,
  pollDetails,
  pollSearch,
  router,
  messages,
  actionsPending,
  menu,
  firebase,
  votedStatus,
  register
});

export default pollApp;
