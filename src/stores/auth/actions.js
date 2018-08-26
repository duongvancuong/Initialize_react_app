import { createAction } from 'redux-actions';

export const requestLoginAction = createAction('REQ_LOGIN_ACTION');
export const authticatedAction = createAction('AUTHENTICATED');
export const authErrorAction = createAction('AUTH_ERROR_ACTION');
export const loadingAction = createAction('LOADING_ACTION');
export const logoutAction = createAction('LOGOUT_ACTION');
export const logoutedAction = createAction('LOGOUTED_ACTION');
