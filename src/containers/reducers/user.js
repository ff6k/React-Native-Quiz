import {
  CURRENT_USER_FETCH,
  CURRENT_USER_FETCH_FAILED,
  LOGIN_SUCCESSFUL,
  SIGNUP_SUCCESSFUL,
  UPDATE_SUCCESSFUL,
  REQ_CODE_SUCCESS,
  DETAIL_RESET_SUCCESS,
  GET_USERS_BY_NAME_SUCCESS,
  GET_MYFRIENDS_LIST_SUCCESS,
  REMOVE_FRIEND_SUCCESS,
  REMOVE_FRIEND_FAILED,
  REMOVE_FRIEND_FETCHING,
  CURRENT_TEACHER_FETCH,
  CURRENT_TEACHER_FETCH_FAILED,
  GET_TEACHERS_BY_NAME_SUCCESS,
  GET_MYTEACHERS_LIST_SUCCESS,
  REMOVE_TEACHER_SUCCESS,
  REMOVE_TEACHER_FAILED,
  REMOVE_TEACHER_FETCHING,
  GET_STUDENT_INFO,
  GET_STUDENT_INFO_SUCCESS,
  GET_STUDENT_INFO_FAILED,
} from '../types';

const initialState = {
  isFetching: false,
  registered: false,
  requested_code: false,
  isRemoving: false,
  friendsList: [],
  teachersList: [],
  infoList: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CURRENT_USER_FETCH:
      return { ...state, isFetching: true };
    case CURRENT_TEACHER_FETCH:
      return { ...state, isFetching: true };
    case LOGIN_SUCCESSFUL:
      return { ...state, ...payload, isFetching: false };
    case SIGNUP_SUCCESSFUL:
      return { ...state, ...payload, isFetching: false };
    case UPDATE_SUCCESSFUL:
      return { ...state, ...payload, isFetching: false };
    case CURRENT_USER_FETCH_FAILED:
      return { ...state, ...payload, isFetching: false };
    case CURRENT_TEACHER_FETCH_FAILED:
      return { ...state, ...payload, isFetching: false };
    case REQ_CODE_SUCCESS:
      return { ...state, ...payload, isFetching: false };
    case DETAIL_RESET_SUCCESS:
      return { isFetching: false, registered: false, requested_code: false };
    case GET_USERS_BY_NAME_SUCCESS:
      return { ...state, list: payload, isFetching: false };
    case GET_TEACHERS_BY_NAME_SUCCESS:
      return { ...state, teacherList: payload, isFetching: false };
    case GET_MYFRIENDS_LIST_SUCCESS:
      return { ...state, friendsList: payload, isFetching: false };
    case GET_MYTEACHERS_LIST_SUCCESS:
      return { ...state, teachersList: payload, isFetching: false };
    case REMOVE_FRIEND_FETCHING:
      return { ...state, isRemoving: true };
    case REMOVE_FRIEND_SUCCESS:
      return { ...state, isRemoving: false };
    case REMOVE_FRIEND_FAILED:
      return { ...state, isRemoving: false };
    case REMOVE_TEACHER_FETCHING:
      return { ...state, isRemoving: true };
    case REMOVE_TEACHER_SUCCESS:
      return { ...state, isRemoving: false };
    case REMOVE_TEACHER_FAILED:
      return { ...state, isRemoving: false };
    case GET_STUDENT_INFO:
      return { ...state, isFetching: true };
    case GET_STUDENT_INFO_SUCCESS:
      return { ...state, infoList: payload, isFetching: false };
    case GET_STUDENT_INFO_FAILED:
      return { ...state, ...payload, isFetching: false };

    default:
      return state;
  }
};
