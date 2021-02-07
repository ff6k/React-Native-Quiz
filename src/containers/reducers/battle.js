import {
  BATLLE_START,
  INVING_FRIEND,
  INVING_FRIEND_SUCCESS,
  INVING_FRIEND_FAILED,
  POST_BATTLE,
  POST_BATTLE_SUCCESS,
  POST_BATTLE_FAILD,
  BATTLE_QNS_FECHING,
  BATTLE_QNS_SUCCESS,
  BATTLE_QNS_FAILED,
  FRIENDS_REQUEST_FECHING,
  FRIENDS_REQUEST_SUCCESS,
  FRIENDS_REQUEST_FAILED,
  JOIN_BATLLE_START,
  UPDATE_BATTLE_RESULT_FECHING,
  UPDATE_BATTLE_RESULT_SUCCESS,
  UPDATE_BATTLE_RESULT_FAILED,
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
  BATTLE_SUMMARY_FAILED,
  BATTLE_SUMMARY_SUCCESS,
  BATTLE_OPEN_QNS_SUCCESS,
  BATTLE_OPEN_QNS_FAILED,
  BATTLE_POSITION_SUCCESS,
  BATTLE_POSITION_FAILED,
  BATTLE_POSITION_FETCHING,
  BATTLE_POSITION_UPDATE,
  PREPARE_OPEN_BATTLE_SUCCESS,
  PREPARE_OPEN_BATTLE_FAILED,
  TEACHERS_REQUEST_FECHING,
  TEACHERS_REQUEST_SUCCESS,
  TEACHERS_REQUEST_FAILED,
  ADD_TEACHER_REQUEST_FECHING,
  ADD_TEACHER_REQUEST_SUCCESS,
  ADD_TEACHER_REQUEST_FAILED,
  UPDATE_TEACHER_REQUEST_FETCHING,
  UPDATE_TEACHER_REQUEST_SUCCESS,
  UPDATE_TEACHER_REQUEST_FAILED,
  CLEAR_TEACHER_REQUEST_LIST,
  INVING_TEACHER,
  INVING_TEACHER_SUCCESS,
  INVING_TEACHER_FAILED,
} from '../types';

const initialState = {
  isFetching: false,
  isPosting: false,
  isPostSuccess: false,
  isGettingPosition: true,
  isInviting: false,
  qns: {},
  filter: {},
  invitedFriendList: [],
  friendRequestList: [],
  battleQns: [],
  teacherRequestList: [],
  invitedTeacherList: [],
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case BATLLE_START:
      return {
        ...state,
        qns: payload.qns,
        filter: payload.filter,
        position: payload.position,
        duration: payload.duration,
        result: payload.result,
      };
    case JOIN_BATLLE_START:
      return {
        ...state,
        qns: payload.qns,
        filter: payload.filter,
        battleId: payload.battleId,
        position: payload.position,
        duration: payload.duration,
        result: payload.result,
        answers: payload.answers,
      };
    case INVING_FRIEND:
      return { ...state, isInviting: true };
    case INVING_FRIEND_SUCCESS:
      return {
        ...state,
        invitedFriendList: [...state.invitedFriendList, payload],
        isInviting: true,
        isSuccess: true,
      };
    case INVING_FRIEND_FAILED:
      return { ...state, isSuccess: false, isInviting: false };
    case INVING_TEACHER:
      return { ...state, isInviting: true };
    case INVING_TEACHER_SUCCESS:
      return {
        ...state,
        invitedTeacherList: [...state.invitedTeacherList, payload],
        isInviting: true,
        isSuccess: true,
      };
    case INVING_TEACHER_FAILED:
      return { ...state, isSuccess: false, isInviting: false };
    case POST_BATTLE:
      return { ...state, isPosting: true };
    case POST_BATTLE_SUCCESS:
      return {
        ...state,
        isPosting: false,
        battleId: payload,
        isPostSuccess: true,
        invitedFriendList: [],
        friendRequestList: [],
      };
    case POST_BATTLE_FAILD:
      return { ...state, isPosting: false, isPostSuccess: false };
    case BATTLE_QNS_FECHING:
      return { ...state, isFetching: true };
    case BATTLE_QNS_SUCCESS:
      return { ...state, isFetching: false, battleQns: payload };
    case BATTLE_QNS_FAILED:
      return { ...state, isFetching: false };
    case FRIENDS_REQUEST_FECHING:
      return { ...state, isFetching: true };
    case FRIENDS_REQUEST_SUCCESS:
      return { ...state, friendRequestList: payload, isFetching: false };
    case FRIENDS_REQUEST_FAILED:
      return { ...state, isFetching: false };
    case TEACHERS_REQUEST_FECHING:
      return { ...state, isFetching: true };
    case TEACHERS_REQUEST_SUCCESS:
      return { ...state, teacherRequestList: payload, isFetching: false };
    case TEACHERS_REQUEST_FAILED:
      return { ...state, isFetching: false };
    case UPDATE_BATTLE_RESULT_FECHING:
      return { ...state, isFetching: true };
    case UPDATE_BATTLE_RESULT_SUCCESS:
      return { ...state, isFetching: false };
    case UPDATE_BATTLE_RESULT_FAILED:
      return { ...state, isFetching: false };
    case ADD_FRIEND_REQUEST_FECHING:
      return { ...state, isFetching: true };
    case ADD_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        friendRequestList: [...(state.friendRequestList || []), payload],
        isFetching: false,
      };
    case ADD_FRIEND_REQUEST_FAILED:
      return { ...state, isFetching: false };
    case CLEAR_FRIEND_REQUEST_LIST:
      return { ...state, friendRequestList: [] };
    case UPDATE_FRIEND_REQUEST_FETCHING:
      return { ...state, isFetching: true };
    case UPDATE_FRIEND_REQUEST_SUCCESS:
      return { ...state, isFetching: false };
    case UPDATE_FRIEND_REQUEST_FAILED:
      return { ...state, isFetching: false };
    case ADD_TEACHER_REQUEST_FECHING:
      return { ...state, isFetching: true };
    case ADD_TEACHER_REQUEST_SUCCESS:
      return {
        ...state,
        teacherRequestList: [...(state.teacherRequestList || []), payload],
        isFetching: false,
      };
    case ADD_TEACHER_REQUEST_FAILED:
      return { ...state, isFetching: false };
    case CLEAR_TEACHER_REQUEST_LIST:
      return { ...state, teacherRequestList: [] };
    case UPDATE_TEACHER_REQUEST_FETCHING:
      return { ...state, isFetching: true };
    case UPDATE_TEACHER_REQUEST_SUCCESS:
      return { ...state, isFetching: false };
    case UPDATE_TEACHER_REQUEST_FAILED:
      return { ...state, isFetching: false };
    case BATTLE_END_QNS_SUCCESS:
      return { ...state, isFetching: false, battleQnsEnd: payload };
    case BATTLE_END_QNS_FAILED:
      return { ...state, isFetching: false };
    case SAVE_BATTLE_SUCCESS:
      return { ...state };
    case BATTLE_FETCHING:
      return { ...state, isFetching: true };
    case BATTLE_SUMMARY_SUCCESS:
      return { ...state, isFetching: false, battleSummary: payload };
    case BATTLE_SUMMARY_FAILED:
      return { ...state, isFetching: false };
    case BATTLE_OPEN_QNS_SUCCESS:
      return { ...state, isFetching: false, openBattleQns: payload };
    case BATTLE_OPEN_QNS_FAILED:
      return { ...state, isFetching: true };
    case BATTLE_POSITION_FETCHING:
      return { ...state, isGettingPosition: true };
    case BATTLE_POSITION_SUCCESS:
      return { ...state, isGettingPosition: false, battleProcess: payload };
    case BATTLE_POSITION_FAILED:
      return { ...state, isGettingPosition: false };
    case BATTLE_POSITION_UPDATE:
      let qns = state.battleQns.find((a) => a.battleId === payload.battleId);
      if (!qns) {
        qns = state.openBattleQns.find((a) => a.battleId === payload.id);
        qns.position = payload.index;
        qns.duration = payload.duration;
        qns.result = payload.result;
        return { ...state, openBattleQns: state.openBattleQns };
      } else {
        qns.position = payload.index;
        qns.duration = payload.duration;
        qns.result = payload.result;
        return { ...state, battleQns: state.battleQns };
      }
    case PREPARE_OPEN_BATTLE_SUCCESS:
      return { ...state, openBattlePosition: payload };
    case PREPARE_OPEN_BATTLE_FAILED:
      return { ...state };
    default:
      return state;
  }
};
