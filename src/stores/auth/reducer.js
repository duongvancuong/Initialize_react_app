import { combineActions, handleActions } from 'redux-actions';

import {
  authenticateUserSuccess,
  authenticateUserError,
  loadingAction,
  logoutUserSuccess,
  cleanErrorLoginSuccess,
} from './actions';

const initialState = {
  isAuthenticated: false,
  refresh_token: '',
  token: '',
  expired_at: '',
  isLoading: false,
  error: '',
}

const auth = handleActions({
  [combineActions(
    authenticateUserSuccess,
    authenticateUserError,
    loadingAction,
    logoutUserSuccess,
    cleanErrorLoginSuccess
  )]: (state, action) => ({
    ...state, ...action.payload
  })},
  initialState
);

export default auth;
