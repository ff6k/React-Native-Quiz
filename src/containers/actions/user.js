import { DropAlert } from '../../components/Alert';
import {
  HTTP_LOGIN,
  HTTP_SIGNUP,
  HTTP_UPDATE,
  HTTP_REQ_CODE,
  HTTP_RESET,
  HTTP_GET_USERS_BY_NAME,
  HTTP_GET_USERS_BY_ID,
  HTTP_GET_MYFRIENDS_LIST,
  HTTP_REMOVE_FRIEND,
  HTTP_SAVE_PUSH_TOKENS,
  HTTP_GET_TEACHERS_BY_NAME,
  HTTP_GET_MYTEACHERS_LIST,
  HTTP_REMOVE_TEACHER,
  HTTP_GET_STUDENT_INFO,
} from '../../constants/httpActions';
import { rollbar } from '../../screens/Common/rollbar';
import Http from '../../services/Http';
import {
  CURRENT_USER_FETCH,
  CURRENT_USER_FETCH_FAILED,
  LOGIN_SUCCESSFUL,
  LOGOUT_USER,
  SIGNUP_SUCCESSFUL,
  REQ_CODE_SUCCESS,
  DETAIL_RESET_SUCCESS,
  GET_USERS_BY_NAME_SUCCESS,
  GET_USERS_BY_ID_SUCCESS,
  GET_MYFRIENDS_LIST_SUCCESS,
  REMOVE_FRIEND_SUCCESS,
  REMOVE_FRIEND_FAILED,
  REMOVE_FRIEND_FETCHING,
  GET_TEACHERS_BY_NAME_SUCCESS,
  CURRENT_TEACHER_FETCH,
  CURRENT_TEACHER_FETCH_FAILED,
  REMOVE_TEACHER_SUCCESS,
  REMOVE_TEACHER_FAILED,
  REMOVE_TEACHER_FETCHING,
  GET_MYTEACHERS_LIST_SUCCESS,
  GET_STUDENT_INFO,
  GET_STUDENT_INFO_SUCCESS,
  GET_STUDENT_INFO_FAILED,
} from '../types';

export const checkUser = ({ username, password }) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_USER_FETCH });
    const { data, status } = await Http.post(
      undefined,
      { username, password },
      { headers: { ACTION: HTTP_LOGIN } },
    );
    if (status === 200) {
      dispatch({
        type: LOGIN_SUCCESSFUL,
        payload: { registered: true, ...data?.user },
      });

      rollbar.log(data?.user, 'test');

      DropAlert('success', `Success ${status}`, data?.message);
    } else {
      dispatch({ type: CURRENT_USER_FETCH_FAILED });
      DropAlert('error', `Login failed ${status}`, data?.message);
    }
  } catch (error) {
    dispatch({ type: CURRENT_USER_FETCH_FAILED });
    DropAlert('error', 'Error', error.message);
  }
};

export const registerUser = ({
  username,
  fullName,
  password,
  accName,
  email,
  teacher,
}) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_USER_FETCH });
    const user = {
      username,
      name: fullName,
      accName: accName,
      email: email,
      teacher,
    };
    const { data, status } = await Http.post(
      undefined,
      { ...user, password },
      { headers: { ACTION: HTTP_SIGNUP } },
    );
    if (status <= 201) {
      dispatch({
        type: SIGNUP_SUCCESSFUL,
        payload: { registered: true, id: data.id, ...user },
      });
      DropAlert('success', `Success ${status}`, data?.message);
    } else {
      dispatch({ type: CURRENT_USER_FETCH_FAILED });
      DropAlert('error', `Error ${status}`, data?.error || data?.message);
    }
  } catch (error) {
    dispatch({ type: CURRENT_USER_FETCH_FAILED });
    DropAlert('error', `Error ${error.code}`, error.message);
  }
};

export const updateUser = ({
  id,
  username,
  fullName,
  password,
  accName,
  email,
}) => async (dispatch) => {
  //console.log(id);
  try {
    dispatch({ type: CURRENT_USER_FETCH });
    const user = { username, name: fullName, accName, email: email };
    const { data, status } = await Http.post(
      `?userId=${id}`,
      { ...user, password },
      { headers: { ACTION: HTTP_UPDATE } },
    );
    if (status <= 201) {
      dispatch({
        type: SIGNUP_SUCCESSFUL,
        payload: { registered: true, id: id, ...user },
      });
      DropAlert('success', `Success ${status}`, data?.message);
    } else {
      dispatch({ type: CURRENT_USER_FETCH_FAILED });
      DropAlert('error', `Error ${status}`, data?.error || data?.message);
    }
  } catch (error) {
    dispatch({ type: CURRENT_USER_FETCH_FAILED });
    DropAlert('error', `Error ${error.code}`, error.message);
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({ type: LOGOUT_USER });
};

export const requestCode = ({ resetType, email }) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_USER_FETCH });
    const code = { resetType, email };
    const { data, status } = await Http.post(
      undefined,
      { email, resetType },
      { headers: { ACTION: HTTP_REQ_CODE } },
    );
    //console.log(status);
    if (status === 200) {
      //console.log(data);
      dispatch({
        type: REQ_CODE_SUCCESS,
        payload: { requested_code: true, ...code },
      });
      DropAlert('success', `Success ${status}`, data?.message);
    } else {
      dispatch({ type: CURRENT_USER_FETCH_FAILED });
      DropAlert('error', `Login failed ${status}`, data?.message);
    }
  } catch (error) {
    dispatch({ type: CURRENT_USER_FETCH_FAILED });
    DropAlert('error', 'Error', error.message);
    //console.log(error.message);
  }
};

export const resetDetails = ({ resetType, code, password, username }) => async (
  dispatch,
) => {
  let value = resetType == 'password' ? password : username;

  try {
    dispatch({ type: CURRENT_USER_FETCH });

    const { data, status } = await Http.post(
      undefined,
      { code, value },
      { headers: { ACTION: HTTP_RESET } },
    );
    //console.log(status);
    if (status === 200) {
      //console.log(data);
      dispatch({ type: DETAIL_RESET_SUCCESS });
      DropAlert('success', `Success ${status}`, data?.message);
    } else {
      dispatch({ type: CURRENT_USER_FETCH_FAILED });
      DropAlert('error', `Login failed ${status}`, data?.message);
    }
  } catch (error) {
    dispatch({ type: CURRENT_USER_FETCH_FAILED });
    DropAlert('error', 'Error', error.message);
    //console.log(error.message);
  }
};

export const getUsersByName = ({ name, userId }) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_USER_FETCH });

    const { data, status } = await Http.get(`?name=${name}&userId=${userId}`, {
      headers: { ACTION: HTTP_GET_USERS_BY_NAME },
    });

    if (status === 200) {
      dispatch({ type: GET_USERS_BY_NAME_SUCCESS, payload: data?.list });
    } else {
      dispatch({ type: CURRENT_USER_FETCH_FAILED });
      DropAlert('error', `Error ${status}`, data?.error || data?.message);
    }
  } catch (error) {
    dispatch({ type: CURRENT_USER_FETCH_FAILED });
    DropAlert('error', 'Error', error.message);
  }
};

export const getTeachersByName = ({ name, userId }) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_TEACHER_FETCH });

    const { data, status } = await Http.get(`?name=${name}&userId=${userId}`, {
      headers: { ACTION: HTTP_GET_TEACHERS_BY_NAME },
    });

    if (status === 200) {
      dispatch({
        type: GET_TEACHERS_BY_NAME_SUCCESS,
        payload: data?.teacherList,
      });
    } else {
      dispatch({ type: CURRENT_TEACHER_FETCH_FAILED });
      DropAlert('error', `Error ${status}`, data?.error || data?.message);
    }
  } catch (error) {
    dispatch({ type: CURRENT_TEACHER_FETCH_FAILED });
    DropAlert('error', 'Error', error.message);
  }
};

export const getUsersById = ({ userId }) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_USER_FETCH });

    const { data, status } = await Http.get(`?userId=${userId}`, {
      headers: { ACTION: HTTP_GET_USERS_BY_ID },
    });

    if (status === 200) {
      dispatch({ type: GET_USERS_BY_ID_SUCCESS, payload: data?.list });
    } else {
      dispatch({ type: CURRENT_USER_FETCH_FAILED });
      DropAlert('error', `Error ${status}`, data?.error || data?.message);
    }
  } catch (error) {
    dispatch({ type: CURRENT_USER_FETCH_FAILED });
    DropAlert('error', 'Error', error.message);
  }
};
export const getMyFriendsList = ({ user }) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_USER_FETCH });
    const { data, status } = await Http.get(`?userId=${user.id}`, {
      headers: { ACTION: HTTP_GET_MYFRIENDS_LIST },
    });

    if (status === 200) {
      dispatch({ type: GET_MYFRIENDS_LIST_SUCCESS, payload: data?.list });
    } else {
      dispatch({ type: CURRENT_USER_FETCH_FAILED });
      DropAlert('error', `Error ${status}`, data?.error || data?.message);
    }
  } catch (error) {
    dispatch({ type: CURRENT_USER_FETCH_FAILED });
    DropAlert('error', 'Error', error.message);
  }
};

export const getStudentInfo = ({ userId }) => async (dispatch) => {
  console.log('infoooooo');
  try {
    dispatch({ type: GET_STUDENT_INFO });

    const { data, status } = await Http.get(`?userId=${userId}`, {
      headers: { ACTION: HTTP_GET_STUDENT_INFO },
    });

    if (status === 200) {
      dispatch({ type: GET_STUDENT_INFO_SUCCESS, payload: data?.score });
    } else {
      dispatch({ type: GET_STUDENT_INFO_FAILED });
      DropAlert('error', `Error ${status}`, data?.error || data?.message);
    }
  } catch (error) {
    dispatch({ type: GET_STUDENT_INFO_FAILED });
    DropAlert('error', 'Error', error.message);
  }
};

export const removeFriend = ({ userId, friendId }) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_FRIEND_FETCHING });
    const { data, status } = await Http.post(
      undefined,
      { userId, friendId },
      {
        headers: { ACTION: HTTP_REMOVE_FRIEND },
      },
    );

    if (status === 200) {
      dispatch({ type: REMOVE_FRIEND_SUCCESS });
    } else {
      dispatch({ type: REMOVE_FRIEND_FAILED });
      DropAlert('error', `Error ${status}`, data?.error || data?.message);
    }
  } catch (error) {
    dispatch({ type: REMOVE_FRIEND_FAILED });
    DropAlert('error', 'Error', error.message);
  }
};
// TEACHER
export const getMyTeachersList = ({ user }) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_TEACHER_FETCH });
    const { data, status } = await Http.get(`?userId=${user.id}`, {
      headers: { ACTION: HTTP_GET_MYTEACHERS_LIST },
    });

    if (status === 200) {
      dispatch({ type: GET_MYTEACHERS_LIST_SUCCESS, payload: data?.list });
    } else {
      dispatch({ type: CURRENT_TEACHER_FETCH_FAILED });
      DropAlert('error', `Error ${status}`, data?.error || data?.message);
    }
  } catch (error) {
    dispatch({ type: CURRENT_TEACHER_FETCH_FAILED });
    DropAlert('error', 'Error', error.message);
  }
};

export const removeTeacher = ({ userId, friendId }) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_TEACHER_FETCHING });
    const { data, status } = await Http.post(
      undefined,
      { userId, friendId },
      {
        headers: { ACTION: HTTP_REMOVE_TEACHER },
      },
    );

    if (status === 200) {
      dispatch({ type: REMOVE_TEACHER_SUCCESS });
    } else {
      dispatch({ type: REMOVE_TEACHER_FAILED });
      DropAlert('error', `Error ${status}`, data?.error || data?.message);
    }
  } catch (error) {
    dispatch({ type: REMOVE_TEACHER_FAILED });
    DropAlert('error', 'Error', error.message);
  }
};
//
export const savePushTokens = ({ tokens, user }) => async (dispatch) => {
  const { data, status } = await Http.post(
    `?userId=${user.id}`,
    { tokens },
    {
      headers: { ACTION: HTTP_SAVE_PUSH_TOKENS },
    },
  );
  console.log(data, status);
};
