import { combineActions, handleActions } from 'redux-actions';

import {
  authticatedAction,
  authErrorAction,
  loadingAction,
  logoutedAction,
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
  [combineActions(authticatedAction, authErrorAction, loadingAction, logoutedAction)]: (state, action) => ({
    ...state, ...action.payload
  })},
  initialState
);

export default auth;
