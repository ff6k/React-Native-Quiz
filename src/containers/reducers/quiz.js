import { NUMBER, ADDITION, LEVEL_1 } from '../../constants';
import {
  QUIZES_FETCHING,
  QUIZES_FETCH_FAILED,
  QUIZES_FETCH_SUCCESS,
  QUIZES_SUMMERY_FETCH_SUCCESS,
  SET_QUIZ_TYPE,
  SET_QUIZ_COLLECTION,
  SET_QUIZ_LEVEL,
  QUIZES_TOP_SUCCESS,
  QUIZES_MYSCORE_SUCCESS
} from '../types';

const initialState = { isFetching: false, questions: [], type: ADDITION, collection: NUMBER, level: LEVEL_1, summery:{correct:0,total:0}, top:[] };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case QUIZES_FETCHING:
      return { ...state, isFetching: true };
    case QUIZES_FETCH_SUCCESS:
      return { ...state, questions: payload, isFetching: false };
    case QUIZES_TOP_SUCCESS:
      return { ...state, top: payload, isFetching: false };
    case QUIZES_MYSCORE_SUCCESS:
      return { ...state, myScore: payload, isFetching: false };
    case QUIZES_SUMMERY_FETCH_SUCCESS:
      return { ...state, summery: payload, isFetching: false };
    case QUIZES_FETCH_FAILED:
      return { ...state, isFetching: false };
    case SET_QUIZ_TYPE:
      return { ...state, type: payload };
    case SET_QUIZ_COLLECTION:
      return { ...state, collection: payload };
    case SET_QUIZ_LEVEL:
      return { ...state, level: payload };
    default:
      return state;
  }
};
