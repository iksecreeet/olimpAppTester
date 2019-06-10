import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import DataReducer from './DataReducer';
import ChatReducer from './ChatReducer';
//import message from './ChatReducer.js';
/* When combined and exported, use "this.props.user" anywhere to access the updated state */

export default combineReducers({
	auth: AuthReducer,
	profile: ProfileReducer,
	todos: DataReducer,
	chat: ChatReducer
});
