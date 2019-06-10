import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import axios from 'axios';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import NavigationService from '../actions/NavigationService';
import { 
	EMAIL_CHANGED, 
	PASSWORD_CHANGED,
	NAME_CHANGED,
  LOGIN_USER, 
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
  SIGN_IN_USER,
  SIGN_IN_USER_FAIL, 
	SIGN_IN_USER_SUCCESS,
	LOGGED_IN,
	LOGGED_OUT,
  RESET_PASSWORD,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
} from './types';

const authFailMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'E-mail невереный.';
    case 'auth/user-disabled':
      return 'Пользователь заблокирован';
    case 'auth/user-not-found':
      return 'Пользователь не найден.';
    case 'auth/wrong-password':
      return 'Неверный пароль.';
    case 'auth/email-already-in-use':
      return 'E-mail уже используется.';
    case 'auth/weak-password':
      return 'Короткий пароль.';
    default:
      return 'Ошибка при авторизации.';
  }
};

const authSocialFailMessage = (error) => {
  switch (error) {
    case 'statusCodes.SIGN_IN_CANCELLED':
      return 'Вы отменили вход';
    case 'statusCodes.IN_PROGRESS':
      return 'В процессе';
    case 'statusCodes.SIGN_IN_REQUIRED':
      return 'Требуется авторизация';
    case 'statusCodes.PLAY_SERVICES_NOT_AVAILABLE':
      return 'Недоступны сервисы GooglePlay';
    default:
      return 'Ошибка при авторизации.';
  }
};

const resetFailMessages = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'Пользователь не найден.';
    case 'auth/invalid-email':
      return 'Неверный email.';
    default:
      return 'Ошибка при сбросе пароля.';
  }
};

const signInFailMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'E-mail уже используется.';
    case 'auth/invalid-email':
      return 'Неверный email.';
    case 'auth/operation-not-allowed':
      return 'Операция невозможна.';
    case 'auth/weak-password':
      return 'Короткий пароль. Мин: 6 символов';
    default:
      return 'Ошибка при регистрации.';
  }
};

export const emailChanged = (text) => ({
		type: EMAIL_CHANGED,
		payload: text
});

export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};

export const signInUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: SIGN_IN_USER });
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => successUserSignIn(dispatch, user))
    .catch((err) => signInUserFail(dispatch, err));
  };
};

export const loginUser = ({ email, password }) => {
	return (dispatch) => {
	dispatch({ type: LOGIN_USER });
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(user => loginUserSuccess(dispatch, user))
    .catch((err) => {
      loginUserFail(dispatch, err);
      console.log(err);
    });
		/*.catch((err) => {
			firebase.auth().createUserWithEmailAndPassword(email, password)
				.then(user => loginUserSuccess(dispatch, user))
				.catch(() => loginUserFail(dispatch));
				console.log(err);
		});*/
	};
};

export const resetPassword = ({ email }) => {
  return (dispatch) => {
    dispatch({ type: RESET_PASSWORD });
    const actionCodeSettings = {
        url: 'https://olimpapp-4eacc.firebaseapp.com',
        handleCodeInApp: true,
        iOS: {
          bundleId: 'com.appolimp',
        },
        android: {
          packageName: 'com.appolimp',
          installApp: false,
          minimumVersion: '12',
        },
        dynamicLinkDomain: 'appolimp.page.link'
    };
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => resetPasswordSuccess(dispatch))
    .catch((err) => resetPasswordFail(dispatch, err));
  };
};

// Calling this function will open Google for login.
export const googleLogin = async() => {
  try {
    // Add any configuration settings here:
    await GoogleSignin.configure();
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const data = await GoogleSignin.signIn();
    // create a new firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
    // login with credential
    const currentUser = await firebase.auth().signInWithCredential(credential);
    firebase.firestore().collection('users').doc(currentUser.user.uid).set({ 
      email: currentUser.user.email, 
      uid: currentUser.user.uid,
      coins: 0
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
    
    axios.get('https://liga-app.com/api/auth/?action=user/create', {
      params: {
        userid: currentUser.user.email,
        username: currentUser.user.displayName
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }
    })
  .then(response => console.log(response.data))
  .catch(error => console.log(error));
    //console.info(JSON.stringify(currentUser.user.toJSON()));

  } catch (error) {
    console.error(error);
  }
};
export const facebookLogin = async () => {
  try {
    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      //throw new Error('User cancelled request'); // Handle this however fits the flow of your app
     console.log('Отменил вход');
    }
    //console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

    // get the access token
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      console.log('Что-то пошло не так');
      /*throw new 
       Error('Something went wrong obtaining the users access token');
       Handle this however fits the flow of your app
       */
    }
    // Create a new firebase credential with the token
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    if (!credential) {
      console.log('Ошибка');
    }
    // Login with credential
    const currentUser = await firebase.auth().signInWithCredential(credential);

    console.info(JSON.stringify(currentUser.user.toJSON()));

    NavigationService.navigate('Home');
  } catch (e) {
    console.error(e);
  }
};
//This checks to see if the user is currently signed in.
export const loggedIn = () => {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: LOGGED_IN,
          payload: user
        });
      } else {
        dispatch({
          type: LOGGED_OUT
        });
      }
    });
  };
};
//Failed email 
const resetPasswordFail = (dispatch, err) => {
  dispatch({ 
    type: RESET_PASSWORD_FAIL,
    payload: resetFailMessages(err.code)
  });
};
const resetPasswordSuccess = (dispatch) => {
  dispatch({ 
    type: RESET_PASSWORD_SUCCESS,
  });
};
//User fail function
const signInUserFail = (dispatch, err) => {
  dispatch({ 
    type: SIGN_IN_USER_FAIL,
    payload: signInFailMessage(err.code)
  });
};

const loginUserFail = (dispatch, err) => {
	dispatch({ 
		type: LOGIN_USER_FAIL,
    payload: authFailMessage(err.code)
	});
  console.log(authFailMessage(err.code));
};
//Some actions on user sign in 
const successUserSignIn = (dispatch, user) => {
  dispatch({ 
    type: SIGN_IN_USER_SUCCESS,
    payload: user
  });
  /*firebase.firestore().collection('users').doc('first').add(user);
  const data = {
    email: user.user.email,
    uid: user.user.uid
  };
  console.log(data);
  */
  //Add user to firestore collection
  firebase.firestore().collection('users').doc(user.user.uid).set({ 
    email: user.user.email, 
    uid: user.user.uid,
    coins: 0
  });
    /*
   firebase.firestore()
    .collection('courses')
    .doc('jPmoknuY1xlkFGO8tfFm')
    .collection(user.user.uid)
    .doc('courceID_1')
    .set({ 
      purchased: true, 
      progress: 0
  });*/
  //Create user in Chatkit
  axios.get('https://liga-app.com/api/auth/?action=user/create', {
    params: {
      userid: user.user.email,
      username: user.user.email.replace(/@[^@]+$/, '')
    },
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
   }
  })
  .then(response => console.log(response.data))
  .catch(error => console.log(error));
  //Update user profile in Firebase data
   /*user.updateProfile({
      displayName: user.user.email.replace(/@[^@]+$/, ''),
      //photoURL: 'https://example.com/jane-q-user/profile.jpg'
   });*/
  //NavigationService.navigate('Home', { userName: user.user.email });
};

const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
	//NavigationService.navigate('Home');
};

