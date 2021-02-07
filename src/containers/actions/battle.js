import { DropAlert } from '../../components/Alert';
import {
  HTTP_INVITE_FRIEND,
  HTTP_INVITE_TEACHER,
  HTTP_POST_BATTLE,
  HTTP_GET_BATTLE_QUESTION,
  HTTP_GET_FRIENDS_REQUEST_LIST,
  HTTP_GET_TEACHERS_REQUEST_LIST,
  HTTP_UPDATE_BATTLE_RESULT,
  HTTP_ADD_FRIEND_REQUEST,
  HTTP_UPDATE_FRIEND_REQUEST,
  HTTP_ADD_TEACHER_REQUEST,
  HTTP_UPDATE_TEACHER_REQUEST,
  HTTP_SAVE_BATTLE_SUMMARY,
  HTTP_GET_BATTLE_SUMMARY,
  HTTP_GET_BATTLE_POSITION,
  HTTP_GET_OPEN_BATTLE_QUESTION,
  HTTP_PREPARE_OPEN_BATTLE,
} from '../../constants/httpActions';
import Http from '../../services/Http';
import {
  BATLLE_START,
  POST_BATTLE,
  POST_BATTLE_SUCCESS,
  POST_BATTLE_FAILD,
  INVING_FRIEND,
  INVING_FRIEND_FAILED,
  INVING_FRIEND_SUCCESS,
  BATTLE_QNS_FECHING,
  BATTLE_QNS_SUCCESS,
  BATTLE_QNS_FAILED,
  FRIENDS_REQUEST_FECHING,
  FRIENDS_REQUEST_SUCCESS,
  FRIENDS_REQUEST_FAILED,
  JOIN_BATLLE_START,
  UPDATE_BATTLE_RESULT_FAILED,
  UPDATE_BATTLE_RESULT_FECHING,
  UPDATE_BATTLE_RESULT_SUCCESS,
  ADD_FRIEND_REQUEST_FECHING,
  ADD_FRIEND_REQUEST_SUCCESS,
  ADD_FRIEND_REQUEST_FAILED,
  CLEAR_FRIEND_REQUEST_LIST,
  UPDATE_FRIEND_REQUEST_FETCHING,
  UPDATE_FRIEND_REQUEST_SUCCESS,
  UPDATE_FRIEND_REQUEST_FAILED,
  BATTLE_END_QNS_SUCCESS,
  BATTLE_END_QNS_FAILED,
  SAVE_BATTLE_SUCCESS,
  BATTLE_FETCHING,
  BATTLE_SUMMARY_SUCCESS,
  BATTLE_SUMMARY_FAILED,
  BATTLE_OPEN_QNS_SUCCESS,
  BATTLE_OPEN_QNS_FAILED,
  BATTLE_POSITION_SUCCESS,
  BATTLE_POSITION_FAILED,
  BATTLE_POSITION_FETCHING,
  BATTLE_POSITION_UPDATE,
  PREPARE_OPEN_BATTLE_SUCCESS,
  PREPARE_OPEN_BATTLE_FAILED,
  CLEAR_TEACHER_REQUEST_LIST,
  ADD_TEACHER_REQUEST_FECHING,
  ADD_TEACHER_REQUEST_SUCCESS,
  ADD_TEACHER_REQUEST_FAILED,
  UPDATE_TEACHER_REQUEST_FETCHING,
  UPDATE_TEACHER_REQUEST_SUCCESS,
  UPDATE_TEACHER_REQUEST_FAILED,
  TEACHERS_REQUEST_FECHING,
  TEACHERS_REQUEST_SUCCESS,
  TEACHERS_REQUEST_FAILED,
  INVING_TEACHER,
  INVING_TEACHER_FAILED,
  INVING_TEACHER_SUCCESS,
} from '../types';

export const startBattle = (props) => (dispatch) => {
  dispatch({ type: BATLLE_START, payload: props });
};

export const joinBattle = (props) => (dispatch) => {
  dispatch({ type: JOIN_BATLLE_START, payload: props });
};

export const postBattle = (props) => async (dispatch, { user }) => {
  try {
    dispatch({ type: POST_BATTLE });

    const { data, status } = await Http.post(`?userId=${user.id}`, props, {
      headers: { ACTION: HTTP_POST_BATTLE },
    });

    if (status === 200) {
      dispatch({ type: POST_BATTLE_SUCCESS, payload: data?.id });
      return true;
    } else {
      dispatch({ type: POST_BATTLE_FAILD });
      DropAlert('error', 'Error', data?.message);
      return false;
    }
  } catch (error) {
    dispatch({ type: POST_BATTLE_FAILD });
    DropAlert('error', 'Error', error?.message);
    return false;
  }
};

export const inviteFriend = (param) => async (dispatch) => {
  try {
    dispatch({ type: INVING_FRIEND });
    const { data, status } = await Http.post(null, param, {
      headers: { ACTION: HTTP_INVITE_FRIEND },
    });
    if (status === 200 && data) {
      dispatch({ type: INVING_FRIEND_SUCCESS, payload: param });
      return true;
    } else {
      dispatch({ type: INVING_FRIEND_FAILED });
      DropAlert('error', 'Error', data?.message);
      return false;
    }
  } catch (err) {
    DropAlert('error', 'Error', err);
  }
};

export const getBattleQns = (isopen) => async (dispatch, { user }) => {
  dispatch({ type: BATTLE_QNS_FECHING });

  let filter = `?userId=${user.id}&isopen=${isopen}`;

  const { data, status } = await Http.get(filter, {
    headers: { ACTION: HTTP_GET_BATTLE_QUESTION },
  });

  if (status === 200) {
    dispatch({ type: BATTLE_QNS_SUCCESS, payload: data?.list });
  } else {
    dispatch({ type: BATTLE_QNS_FAILED });
    DropAlert('error', 'Error', data?.message);
  }
};

export const getOpenBattleQns = (isopen) => async (dispatch, { user }) => {
  dispatch({ type: BATTLE_QNS_FECHING });

  let filter = `?userId=${user.id}&isopen=${isopen}`;

  const { data, status } = await Http.get(filter, {
    headers: { ACTION: HTTP_GET_OPEN_BATTLE_QUESTION },
  });

  if (status === 200) {
    dispatch({ type: BATTLE_OPEN_QNS_SUCCESS, payload: data?.list });
  } else {
    dispatch({ type: BATTLE_OPEN_QNS_FAILED });
    DropAlert('error', 'Error', data?.message);
  }
};

export const getBattleEndResult = (battleId) => async (dispatch, { user }) => {
  dispatch({ type: BATTLE_QNS_FECHING });

  let filter = `?userId=${user.id}`;
  if (battleId) {
    filter = filter + `&battleId=${battleId}`;
  }

  const { data, status } = await Http.get(filter, {
    headers: { ACTION: HTTP_GET_BATTLE_QUESTION },
  });

  if (status === 200) {
    dispatch({ type: BATTLE_END_QNS_SUCCESS, payload: data?.list });
  } else {
    dispatch({ type: BATTLE_END_QNS_FAILED });
    DropAlert('error', 'Error', data?.message);
  }
};

export const getFriendsRequestList = () => async (dispatch, { user }) => {
  dispatch({ type: FRIENDS_REQUEST_FECHING });
  const { data, status } = await Http.get(`?userId=${user.id}`, {
    headers: { ACTION: HTTP_GET_FRIENDS_REQUEST_LIST },
  });

  if (status === 200) {
    dispatch({ type: FRIENDS_REQUEST_SUCCESS, payload: data?.list });
  } else {
    dispatch({ type: FRIENDS_REQUEST_FAILED });
    DropAlert('error', 'Error', data?.message);
  }
};

export const updateBattleResult = (props) => async (dispatch) => {
  dispatch({ type: UPDATE_BATTLE_RESULT_FECHING });

  const { data, status } = await Http.post(null, props, {
    headers: { ACTION: HTTP_UPDATE_BATTLE_RESULT },
  });

  if (status === 200) {
    dispatch({ type: UPDATE_BATTLE_RESULT_SUCCESS });
  } else {
    dispatch({ type: UPDATE_BATTLE_RESULT_FAILED });
    DropAlert('error', 'Error', data?.message);
  }
};

export const addFriendRequest = (param) => async (dispatch) => {
  try {
    dispatch({ type: ADD_FRIEND_REQUEST_FECHING });

    const { data, status } = await Http.post(null, param, {
      headers: { ACTION: HTTP_ADD_FRIEND_REQUEST },
    });

    if (status === 200) {
      dispatch({ type: ADD_FRIEND_REQUEST_SUCCESS, payload: param });
      DropAlert('info', 'Info', data?.message);
      return true;
    } else {
      dispatch({ type: ADD_FRIEND_REQUEST_FAILED });
      DropAlert('error', 'Error', data?.message);
      return false;
    }
  } catch (error) {
    dispatch({ type: ADD_FRIEND_REQUEST_FAILED });
    DropAlert('error', 'Error', error?.message);
    return false;
  }
};

export const clearFriendRequestList = () => (dispatch) => {
  dispatch({ type: CLEAR_FRIEND_REQUEST_LIST });
};

export const updateFriendRequest = (param) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_FRIEND_REQUEST_FETCHING });
    const { data, status } = await Http.post(null, param, {
      headers: { ACTION: HTTP_UPDATE_FRIEND_REQUEST },
    });

    if (status === 200) {
      dispatch({ type: UPDATE_FRIEND_REQUEST_SUCCESS });
      DropAlert('info', 'Info', data?.message);
    } else {
      dispatch({ type: UPDATE_FRIEND_REQUEST_FAILED });
      DropAlert('error', 'Error', data?.message);
    }
  } catch (error) {
    dispatch({ type: UPDATE_FRIEND_REQUEST_FAILED });
    DropAlert('error', 'Error', error?.message);
  }
};

// TEACHER FRIEND REQUEST
export const addTeacherRequest = (param) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TEACHER_REQUEST_FECHING });

    const { data, status } = await Http.post(null, param, {
      headers: { ACTION: HTTP_ADD_TEACHER_REQUEST },
    });

    if (status === 200) {
      dispatch({ type: ADD_TEACHER_REQUEST_SUCCESS, payload: param });
      DropAlert('info', 'Info', data?.message);
      return true;
    } else {
      dispatch({ type: ADD_TEACHER_REQUEST_FAILED });
      DropAlert('error', 'Error', data?.message);
      return false;
    }
  } catch (error) {
    dispatch({ type: ADD_TEACHER_REQUEST_FAILED });
    DropAlert('error', 'Error', error?.message);
    return false;
  }
};

export const inviteTeacher = (param) => async (dispatch) => {
  try {
    dispatch({ type: INVING_TEACHER });
    const { data, status } = await Http.post(null, param, {
      headers: { ACTION: HTTP_INVITE_TEACHER },
    });
    if (status === 200 && data) {
      dispatch({ type: INVING_TEACHER_SUCCESS, payload: param });
      return true;
    } else {
      dispatch({ type: INVING_TEACHER_FAILED });
      DropAlert('error', 'Error', data?.message);
      return false;
    }
  } catch (err) {
    DropAlert('error', 'Error', err);
  }
};

export const getTeachersRequestList = () => async (dispatch, { user }) => {
  dispatch({ type: TEACHERS_REQUEST_FECHING });
  const { data, status } = await Http.get(`?userId=${user.id}`, {
    headers: { ACTION: HTTP_GET_TEACHERS_REQUEST_LIST },
  });

  if (status === 200) {
    dispatch({ type: TEACHERS_REQUEST_SUCCESS, payload: data?.list });
  } else {
    dispatch({ type: TEACHERS_REQUEST_FAILED });
    DropAlert('error', 'Error', data?.message);
  }
};

export const clearTeacherRequestList = () => (dispatch) => {
  dispatch({ type: CLEAR_TEACHER_REQUEST_LIST });
};

export const updateTeacherRequest = (param) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TEACHER_REQUEST_FETCHING });
    const { data, status } = await Http.post(null, param, {
      headers: { ACTION: HTTP_UPDATE_TEACHER_REQUEST },
    });

    if (status === 200) {
      dispatch({ type: UPDATE_TEACHER_REQUEST_SUCCESS });
      DropAlert('info', 'Info', data?.message);
    } else {
      dispatch({ type: UPDATE_TEACHER_REQUEST_FAILED });
      DropAlert('error', 'Error', data?.message);
    }
  } catch (error) {
    dispatch({ type: UPDATE_TEACHER_REQUEST_FAILED });
    DropAlert('error', 'Error', error?.message);
  }
};

//

export const saveBattleScoreSummary = (param) => async (dispatch, { user }) => {
  try {
    const { status, data } = await Http.post(`?userId=${user.id}`, param, {
      headers: { ACTION: HTTP_SAVE_BATTLE_SUMMARY },
    });
    if (status === 200 || status === 201) {
      dispatch({ type: SAVE_BATTLE_SUCCESS });
    } else {
      DropAlert('error', 'Error saving your results', data?.message);
    }
  } catch (error) {
    DropAlert('error', 'Error', error?.message);
  }
};

export const getBattleSummary = () => async (dispatch, { user }) => {
  try {
    dispatch({ type: BATTLE_FETCHING });
    const { data, status } = await Http.get(`?userId=${user.id}`, {
      headers: { ACTION: HTTP_GET_BATTLE_SUMMARY },
    });
    if (status === 200) {
      dispatch({ type: BATTLE_SUMMARY_SUCCESS, payload: data?.score });
    } else {
      dispatch({ type: BATTLE_SUMMARY_FAILED });
    }
  } catch (error) {
    dispatch({ type: BATTLE_SUMMARY_FAILED });
    DropAlert('error', 'Error', error?.message);
    //console.log(error?.message);
  }
};

export const getBattlePosition = (battleId) => async (dispatch, { user }) => {
  try {
    dispatch({ type: BATTLE_POSITION_FETCHING });
    const { data, status } = await Http.get(
      `?userId=${user.id}&battleId=${battleId}`,
      {
        headers: { ACTION: HTTP_GET_BATTLE_POSITION },
      },
    );
    if (status === 200) {
      dispatch({ type: BATTLE_POSITION_SUCCESS, payload: data?.process });
    } else {
      dispatch({ type: BATTLE_POSITION_FAILED });
    }
  } catch (error) {
    dispatch({ type: BATTLE_POSITION_FAILED });
    DropAlert('error', 'Error', error?.message);
  }
};

export const updatePosition = (props) => async (dispatch) => {
  dispatch({ type: BATTLE_POSITION_UPDATE, payload: props });
};

export const prepareOpenBattle = (props) => async (dispatch, { user }) => {
  try {
    dispatch({ type: BATTLE_POSITION_FETCHING });
    const { data, status } = await Http.get(
      `?userId=${user.id}&battleId=${props.battleId}&updated=${props.updated}`,
      {
        headers: { ACTION: HTTP_PREPARE_OPEN_BATTLE },
      },
    );
    if (status === 200) {
      dispatch({ type: PREPARE_OPEN_BATTLE_SUCCESS, payload: data?.result });
      return data?.result;
    } else {
      dispatch({ type: PREPARE_OPEN_BATTLE_FAILED });
      return null;
    }
  } catch (error) {
    dispatch({ type: PREPARE_OPEN_BATTLE_FAILED });
    DropAlert('error', 'Error', error?.message);
    return null;
  }
};
