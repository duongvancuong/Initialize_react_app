/* eslint-disable */
import {
  put,
  call,
  takeLatest,
  select,
  all,
} from 'redux-saga/effects';
import { login, logout } from '../../services/auth';

import {
  authenticateUser,
  authenticateUserSuccess,
  authenticateUserError,
  loadingUserData,
  logoutUser,
  logoutUserSuccess,
  cleanErrorLogin,
  cleanErrorLoginSuccess,
  handleExceptionUserError,
} from './actions';

import { getToken } from '../../selectors/authSelector';

const authLogin = token => ({
  isAuthenticated: true,
  token: token.token,
  refreshToken: token.refresh_token,
  expiredAt: token.expired_at,
  error: '',
});

const authLogout = {
  isAuthenticated: false,
  refresh_token: '',
  token: '',
  expired_at: '',
  isLoading: false,
  error: '',
};

export function* loginUserSaga(data) {
  try {
    yield put(loadingUserData({ isLoading: true }));
    const response = yield call(login, data.payload);
    if (response.error_code) {
      yield put(authenticateUserError({ error: `${response.error_code}` }));
    }
    else {
      const payload = authLogin(response.token);
      yield put(authenticateUserSuccess(payload));
    }
    yield put(loadingUserData({ isLoading: false }));
  }
  catch (e) {
    yield put(loadingUserData({ isLoading: false }));
    yield put(handleExceptionUserError({ error: 'Something Wrong!' }));
  }
}

export function* logoutUserSaga() {
  try {
    yield put(loadingUserData({ isLoading: true }));
    const token = yield select(getToken);
    yield call(logout, token);
    yield [
      put(logoutUserSuccess(authLogout)),
    ];
    yield put(loadingUserData({ isLoading: false }));
  }
  catch (error) {
    yield put(loadingUserData({ isLoading: false }));
    yield put(handleExceptionUserError({ error: 'Something Wrong!' }));
  }
}

export function* cleanErrorLoginSaga() {
  try {
    yield put(cleanErrorLoginSuccess({ error: '' }));
  }
  catch (error) {
    yield put(handleExceptionUserError({ error: 'Something Wrong!' }));
  }
}

export default function* root() {
  yield all([
    takeLatest(authenticateUser, loginUserSaga),
    takeLatest(logoutUser, logoutUserSaga),
    takeLatest(cleanErrorLogin, cleanErrorLoginSaga),
  ]);
}
