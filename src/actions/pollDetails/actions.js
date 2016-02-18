import Firebase from 'firebase';
import {
  UPDATE_POLL_ERROR
} from './action-types';

export function editPollTitle(idPoll, title) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`polls/${idPoll}`)
      .update({title}, error => {
        if (error) {
          console.error('ERROR @ updatePoll :', error); // eslint-disable-line no-console
          dispatch({
            type: UPDATE_POLL_ERROR,
            payload: error,
        });
      }
    });
  };
}

export function addEntry(idPoll, title) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`polls/${idPoll}/entries`)
      .push({ title, votes: 0, createdAt: Firebase.ServerValue.TIMESTAMP }, error => {
        if (error) {
          console.error('ERROR @ updatePoll :', error); // eslint-disable-line no-console
          dispatch({
            type: UPDATE_POLL_ERROR,
            payload: error,
        });
      }
    });
  };
}

export function editEntryTitle(idPoll, idEntry, title) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`polls/${idPoll}/entries/${idEntry}`)
      .update({title}, error => {
        if (error) {
          console.error('ERROR @ updatePoll :', error); // eslint-disable-line no-console
          dispatch({
            type: UPDATE_POLL_ERROR,
            payload: error,
        });
      }
    });
  };
}

export function removeEntry(idPoll, idEntry) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`polls/${idPoll}/entries/${idEntry}`)
      .remove(error => {
        if (error) {
          console.error('ERROR @ updatePoll :', error); // eslint-disable-line no-console
          dispatch({
            type: UPDATE_POLL_ERROR,
            payload: error,
        });
      }
    });
  };
}

export function voteEntry(idPoll, idEntry) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const userVotesRef = firebase.child(`userVotes/${auth.id}/idPoll`);
    const entriVotesRef = firebase.child(`polls/${idPoll}/entries/${idEntry}/votes`);
    userVotesRef.once('value', snap => {
      if (!snap.exists()){
        userVotesRef.set(idEntry).then( error => {
          if (error ) {
            console.error('ERROR @ updatePoll :', error); // eslint-disable-line no-console
              dispatch({
                type: UPDATE_POLL_ERROR,
                payload: error,
              });
            } else {
              entriVotesRef.transaction(votes => votes + 1, error => {
                if (error) {
                  console.error('ERROR @ updatePoll :', error); // eslint-disable-line no-console
                  dispatch({
                    type: UPDATE_POLL_ERROR,
                    payload: error,
                  });
                }
              });
            }
          }
        );
      }
    });
  };
}
