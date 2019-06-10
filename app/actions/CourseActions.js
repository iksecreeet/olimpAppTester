import firebase from 'react-native-firebase';
import axios from 'axios';

import { 
  START_PLAY,
  START_PLAYING_SUCCESS,
  START_PLAYING_FAIL
   } from './types';

export const startPlayCourse = (courseid, roomid, user) => {
  return dispatch => {
    dispatch({ type: START_PLAY });
     firebase.firestore()
      .collection('courses')
      .doc(courseid)
      .collection(user)
      .doc('courceID_1')
      .set({
        startPlay: true,
        startTime: new Date().toLocaleString(), 
        purchased: true, 
        progress: 0
    });
      
    axios.get('https://liga-app.com/api/auth/?action=chanel/addtoroom', {
      params: {
        userid: user.email,
        username: roomid
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }
    })
    .then(data => gameStartSuccess(dispatch, data))
    .catch((err) => gameStartFail(dispatch, err));
  };
};

//Dispatch gameStartSuccess
const gameStartSuccess = (dispatch, data) => {
  dispatch({ 
    type: START_PLAYING_SUCCESS,
    payload: data
  });
};

const gameStartFail = (dispatch, err) => {
  dispatch({
    type: START_PLAYING_FAIL,
    payload: err
  });
};
