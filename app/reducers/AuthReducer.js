import { 
	EMAIL_CHANGED, 
	PASSWORD_CHANGED,
	NAME_CHANGED,
	LOGIN_USER_SUCCESS, 
	LOGIN_USER_FAIL,
	SIGN_IN_USER,
	SIGN_IN_USER_FAIL,
	SIGN_IN_USER_SUCCESS,
	LOGIN_USER,
	LOGGED,
	LOGGED_IN, 
	LOGGED_OUT,
	RESET_PASSWORD,
	RESET_PASSWORD_FAIL,
	RESET_PASSWORD_SUCCESS
} from '../actions/types';

const INITIAL_STATE = { 
	email: '',
	password: '',
	reset: false,
	name: '',
	user: null,
	error: '',
	errorsign: '',
	signedIn: false,
	loading: false,
	isLoggedIn: false,
	hasCheckedAuthState: false
};

export default (state = INITIAL_STATE, action) => {
	console.log(action);
	switch (action.type) {
		case EMAIL_CHANGED:
			return { ...state, email: action.payload, error: '', errorsign: '' };
		case PASSWORD_CHANGED: 
			return { ...state, password: action.payload, error: '', errorsign: '' };
		case NAME_CHANGED: 
			return { ...state, name: action.payload, error: '', errorsign: '' };
		case LOGIN_USER:
			return { ...state, loading: true, error: '', errorsign: '' };
		case LOGIN_USER_SUCCESS:
			return { ...state, user: action.payload, isLoggedIn: true, error: '', errorsign: '', loading: false, password: '' };
		case LOGIN_USER_FAIL:
			return { ...state, error: action.payload, password: '', loading: false };
		case SIGN_IN_USER:
			return { ...state, loading: true, error: '', errorsign: '' };
		case SIGN_IN_USER_SUCCESS:
			return { ...state, loading: false, user: action.payload, signedIn: true, error: '', errorsign: '', password: '', email: '' };
		case SIGN_IN_USER_FAIL:
			return { ...state, errorsign: action.payload, password: '', loading: false };
		case LOGGED:
			return { ...state, isLoggedIn: false, hasCheckedAuthState: false };
		case LOGGED_IN:
			//console.log(action.payload);
			return { ...state, user: action.payload, isLoggedIn: true, hasCheckedAuthState: true, error: '' };
		case LOGGED_OUT:
			return { ...state, isLoggedIn: false, hasCheckedAuthState: true };
		case RESET_PASSWORD: 
			return { ...state, email: action.payload, errror: '', loading: true };
		case RESET_PASSWORD_FAIL: 
			return { ...state, errorsign: action.payload, loading: false };
		case RESET_PASSWORD_SUCCESS: 
			return { ...state, loading: false, errror: '', reset: true };
		default:
			return state;
	}
};
