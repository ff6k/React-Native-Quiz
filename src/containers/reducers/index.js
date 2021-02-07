import { combineReducers } from 'redux';
import { LOGOUT_USER } from '../types';
import quiz from './quiz';
import user from './user';
import battle from './battle';

const appReducer = combineReducers({ user, quiz, battle });
export default (state, action) => {
  if (action.type === LOGOUT_USER) {
    state = undefined;
  }
  return appReducer(state, action);
};
