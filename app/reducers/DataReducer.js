import { 
  FETCH_COURSES_SUCCESS, 
  FETCH_COURSES_FAILURE, 
  FETCHING_COURSES 
} from '../constants';

const initialState = {
    courses: [],
    isFetching: false,
    error: false
};

export default function coursesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_COURSES:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_COURSES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                courses: action.data
            };
        case FETCH_COURSES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        default:
            return state;
    }
}
