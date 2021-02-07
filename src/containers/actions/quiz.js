import { DropAlert } from '../../components/Alert';
import {
  HTTP_ADD_QUIZ,
  HTTP_GET_QUIZES,
  HTTP_GET_SUMMERY,
  HTTP_GET_TOP,
  HTTP_MY_SCORE,
} from '../../constants/httpActions';
import Http from '../../services/Http';
import {
  QUIZES_FETCHING,
  QUIZES_FETCH_FAILED,
  QUIZES_FETCH_SUCCESS,
  QUIZES_SUMMERY_FETCH_SUCCESS,
  QUIZES_TOP_SUCCESS,
  SET_QUIZ_COLLECTION,
  SET_QUIZ_TYPE,
  SET_QUIZ_LEVEL,
  QUIZES_MYSCORE_SUCCESS,
} from '../types';

export const saveQuiz = ({
  userAnswer: useranswer,
  answer,
  question,
  correct,
  collection,
  type,
  level,
  bonuspoints,
}) => async (dispatch, { user }) => {
  try {
    dispatch({ type: QUIZES_FETCHING });
    const { status, data } = await Http.post(
      `?userId=${user.id}`,
      {
        useranswer,
        answer,
        question,
        correct,
        collection,
        type,
        level,
        bonuspoints,
      },
      { headers: { ACTION: HTTP_ADD_QUIZ } },
    );
    if (status === 200 || status === 201) {
      dispatch({ type: QUIZES_FETCH_SUCCESS, payload: data?.quizes });
    } else {
      dispatch({ type: QUIZES_FETCH_FAILED });
      DropAlert('error', 'Error saving your results', data?.message);
    }
  } catch (error) {
    dispatch({ type: QUIZES_FETCH_FAILED });
    DropAlert('error', 'Error', error?.message);
  }
};

export const getQuizes = (type, level) => async (dispatch, { user }) => {
  try {
    dispatch({ type: QUIZES_FETCHING });
    const { data, status } = await Http.get(
      `?userId=${user.id}&type=${type}&level=${level}`,
      {
        headers: { ACTION: HTTP_GET_QUIZES },
      },
    );
    if (status === 200) {
      dispatch({ type: QUIZES_FETCH_SUCCESS, payload: data?.quizes });
    } else {
      dispatch({ type: QUIZES_FETCH_FAILED });
    }
  } catch (error) {
    dispatch({ type: QUIZES_FETCH_FAILED });
    DropAlert('error', 'Error', error?.message);
  }
};

export const getSummery = () => async (dispatch, { user }) => {
  try {
    dispatch({ type: QUIZES_FETCHING });
    const { data, status } = await Http.get(`?userId=${user.id}`, {
      headers: { ACTION: HTTP_GET_SUMMERY },
    });
    if (status === 200) {
      //console.log(data?.summery);
      dispatch({ type: QUIZES_SUMMERY_FETCH_SUCCESS, payload: data?.summery });
    } else {
      dispatch({ type: QUIZES_FETCH_FAILED });
    }
  } catch (error) {
    dispatch({ type: QUIZES_FETCH_FAILED });
    DropAlert('error', 'Error', error?.message);
    //console.log(error?.message);
  }
};

export const getTop = (filter) => async (dispatch, { user }) => {
  try {
    dispatch({ type: QUIZES_FETCHING });
    const { data, status } = await Http.get(
      `?userId=${user.id}&filter=${filter}`,
      {
        headers: { ACTION: HTTP_GET_TOP },
      },
    );
    if (status === 200) {
      //console.log(data);
      dispatch({ type: QUIZES_TOP_SUCCESS, payload: data?.top });
    } else {
      dispatch({ type: QUIZES_FETCH_FAILED });
    }
  } catch (error) {
    dispatch({ type: QUIZES_FETCH_FAILED });
    DropAlert('error', 'Error', error?.message);
    //console.log(error?.message);
  }
};

export const getMyScore = () => async (dispatch, { user }) => {
  try {
    dispatch({ type: QUIZES_FETCHING });
    const { data, status } = await Http.get(`?userId=${user.id}`, {
      headers: { ACTION: HTTP_MY_SCORE },
    });
    if (status === 200) {
      dispatch({ type: QUIZES_MYSCORE_SUCCESS, payload: data?.score });
    } else {
      dispatch({ type: QUIZES_FETCH_FAILED });
    }
  } catch (error) {
    dispatch({ type: QUIZES_FETCH_FAILED });
    DropAlert('error', 'Error', error?.message);
    //console.log(error?.message);
  }
};

export const setQuizType = (type) => async (dispatch) => {
  dispatch({ type: SET_QUIZ_TYPE, payload: type });
};

export const setQuizCollection = (collection) => async (dispatch) => {
  dispatch({ type: SET_QUIZ_COLLECTION, payload: collection });
};

export const setQuizLevel = (level) => async (dispatch) => {
  dispatch({ type: SET_QUIZ_LEVEL, payload: level });
};
