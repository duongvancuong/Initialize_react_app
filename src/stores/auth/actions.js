import { createAction } from 'redux-actions';

export const authenticateUser = createAction('AUTHENTICATE_USER');
export const authenticateUserSuccess = createAction('AUTHENTICATE_USER_SUCCESS');
export const authenticateUserError = createAction('AUTHENTICATE_USER_ERROR');
export const loadingAction = createAction('LOADING_ACTION');
export const logoutUser = createAction('LOGOUT_USER');
export const logoutUserSuccess = createAction('LOGOUT_USER_SUCCESS');
export const cleanErrorLogin = createAction('CLEAN_ERROR_LOGIN');
export const cleanErrorLoginSuccess  = createAction('CLEAN_ERROR_LOGIN_SUCCESS');
