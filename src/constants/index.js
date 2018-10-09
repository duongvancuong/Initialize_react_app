import keyMirror from 'fbjs/lib/keyMirror';

export const ActionsTypes = keyMirror({
  AUTHENTICATE_USER: undefined,
  AUTHENTICATE_USER_SUCCESS: undefined,
  AUTHENTICATE_USER_ERROR: undefined,
  LOADING_USER_DATA: undefined,
  LOGOUT_USER: undefined,
  LOGOUT_USER_SUCCESS: undefined,
  CLEAN_ERROR_LOGIN: undefined,
  CLEAN_ERROR_LOGIN_SUCCESS: undefined,
  HANDLE_EXCEPTION_USER_ERROR: undefined,
  FETCH_CRYPTOCURRENCY_ACTION: undefined,
  FETCH_CRYPTOCURRENCY_ERROR_ACTION: undefined,
  FETCH_CRYPTOCURRENCY_SUCC_ACTION: undefined,
  LOADING_ACTION: undefined,
});
