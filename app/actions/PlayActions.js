//PLAY ACTIONS
import firebase from 'react-native-firebase';

import { 
	ADD_COINS_USER,
	CREATE_GROUP,
	CREATE_GROUP_STARTED,
	CREATE_GROUP_SUCCESS,
	CREATE_GROUP_FAILED,
	RECEIVE_NOTIFICATION,
	RECEIVE_NOTIFICATION_MENTOR
} from './types';


export const createGroup = (user,) => {
	return (dispatch) => {
		dispatch({
			type: CREATE_GROUP,
			payload: roomNum
		})
	};
};

export const addUserToGroup = (user) => {
  return (dispatch) => {
    dispatch({ type: CREATE_GROUP });
  };
};
