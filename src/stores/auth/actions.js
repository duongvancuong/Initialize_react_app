// @flow
import { createActions } from 'redux-actions';
import { ActionsTypes } from '../../constants';

export const {
  authenticateUser,
  authenticateUserSuccess,
  authenticateUserError,
  loadingUserData,
  logoutUser,
  logoutUserSuccess,
  cleanErrorLogin,
  cleanErrorLoginSuccess,
  handleExceptionUserError,
} = createActions({
  [ActionsTypes.AUTHENTICATE_USER]: (payload: {}) => (payload),
  [ActionsTypes.AUTHENTICATE_USER_SUCCESS]: (payload: {}) => (payload),
  [ActionsTypes.AUTHENTICATE_USER_ERROR]: (payload: {}) => (payload),
  [ActionsTypes.LOADING_USER_DATA]: (payload: {}) => (payload),
  [ActionsTypes.LOGOUT_USER]: () => ({}),
  [ActionsTypes.LOGOUT_USER_SUCCESS]: (payload: {}) => (payload),
  [ActionsTypes.CLEAN_ERROR_LOGIN]: () => ({}),
  [ActionsTypes.CLEAN_ERROR_LOGIN_SUCCESS]: (payload: {}) => (payload),
  [ActionsTypes.HANDLE_EXCEPTION_USER_ERROR]: () => ({}),
});
