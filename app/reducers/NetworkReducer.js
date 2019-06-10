import { 
  CHANGE_CONNECTION_STATUS
} from '../actions/types';

const INITIAL_STATE = {
  isConnected: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_CONNECTION_STATUS:
      return Object.assign({}, state, {
        isConnected: action.isConnected,
      });
    default:
      return state;
  }
};

export default reducer;
