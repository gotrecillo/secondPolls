import { SET_POLL, RESET_POLL, SET_VOTED_STATUS } from './action-types';
import { SET_POLLS } from '../polls';
import { pushState } from 'redux-router';

export function registerListeners(params) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const userId = auth.id;
    const pollsref = firebase.child(`myPolls/${userId}`);

    pollsref.on('value', snapshot => {
      const promises = Object.keys(snapshot.val() || []).map( pollId => new Promise(
        resolve => firebase.child(`polls/${pollId}`).once('value', snapshot => resolve({ id: pollId, title: snapshot.val().title } ))
      ));

      Promise.all(promises).then(function(polls) {
        dispatch({
          type: SET_POLLS,
          polls
        });
      });

    });

    const ref = firebase.child(`polls/${params.idPoll}`);
    ref.on('value', snapshot => {
      const newPoll = snapshot.val();
      dispatch(snapshot.exists() ?
        {
          type: SET_POLL,
          poll: Object.assign({}, { id: params.idPoll }, newPoll)
        } :
        pushState(null, '/')
      );
    });

    const userVotesRef = firebase.child(`userVotes/${auth.id}/${params.idPoll}`);
    userVotesRef.on('value', snap => {
      dispatch(snap.exists() ?
        {
          type: SET_VOTED_STATUS,
          status: true,
          entry: snap.val()
        } :
        {
          type: SET_VOTED_STATUS,
          status: false,
          entry: ''
        }
      );
    });
  };
}

export function unregisterListeners(params) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const userId = auth.id;
    firebase.child(`polls/${params.idPoll}`).off();
    firebase.child(`myPolls/${userId}`).off();
    firebase.child(`userVotes/${auth.id}/${params.idPoll}`).off();
    dispatch({
      type: SET_POLLS,
      polls: []
    });
    dispatch({
      type: RESET_POLL
    });
    dispatch({
      type: SET_VOTED_STATUS,
      status: false,
      entry: ''
    });
  };
}
