import { 
  FETCH_COURSES_SUCCESS, 
  FETCH_COURSES_FAILURE, 
  FETCHING_COURSES 
} from '../constants';

export function fetchCourses() {
    return (dispatch) => {
        dispatch(getCourses());
        return (fetch('https://liga-app.com/rest/items/'))
        .then(res => res.json())
        .then(json => {
            return (dispatch(getCoursesSuccess(json)));
        })
        .catch(err => dispatch(getCoursesFailure(err)));
    };
}

function getCourses() {
    return {
        type: FETCHING_COURSES
    };
}

function getCoursesSuccess(data) {
    return {
        type: FETCH_COURSES_SUCCESS,
        data
    };
}

function getCoursesFailure() {
    return {
        type: FETCH_COURSES_FAILURE
    };
}
