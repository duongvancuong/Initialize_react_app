import { combineActions, handleActions } from 'redux-actions';

import {
  authenticateUserSuccess,
  authenticateUserError,
  loadingUserData,
  logoutUserSuccess,
  cleanErrorLoginSuccess,
  handleExceptionUserError,
} from './actions';

const initialState = {
  isAuthenticated: false,
  refreshToken: '',
  token: '',
  expiredAt: '',
  isLoading: false,
  error: '',
};

const auth = handleActions({
  [combineActions(
    authenticateUserSuccess,
    authenticateUserError,
    loadingUserData,
    logoutUserSuccess,
    cleanErrorLoginSuccess,
    handleExceptionUserError,
  )]: (state, action) => ({
    ...state, ...action.payload,
  }),
},
initialState);

export default auth;
