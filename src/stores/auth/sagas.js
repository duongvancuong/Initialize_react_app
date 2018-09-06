import { put, call, take, takeLatest, select } from 'redux-saga/effects';
import { login, logout } from '../../services/auth';

import {
  authenticateUser,
  authenticateUserSuccess,
  authenticateUserError,
  loadingAction,
  logoutUser,
  logoutUserSuccess,
  cleanErrorLogin,
  cleanErrorLoginSuccess,
} from './actions';

import { getToken } from '../../selectors/authSelector';

const auth_login = (token) =>({
  isAuthenticated: true,
  token: token.token,
  refresh_token: token.refresh_token,
  expired_at: token.expired_at,
  error: '',
});

const auth_logout = {
  isAuthenticated: false,
  refresh_token: '',
  token: '',
  expired_at: '',
  isLoading: false,
  error: '',
};

export function* loginUserSaga(data) {
  try {
    yield put(loadingAction({isLoading: true}));
    const { token, error_code } = yield call(login, data.payload);
    if (error_code) {
      yield put(authenticateUserError({ error: error_code }));
    } else {
      const payload = auth_login(token);
      yield [
        put(authenticateUserSuccess(payload)),
      ];
    }
    yield put(loadingAction({isLoading: false}));
  } catch (error) {
    yield put(loadingAction({isLoading: false}));
    yield put({type: 'ERROR_AUTH', error });
  }
};

export function* logoutUserSaga() {
  try {
    yield put(loadingAction({isLoading: true}));
    const token = yield select(getToken)
    yield call(logout, token);
    yield [
      put(logoutUserSuccess(auth_logout)),
    ];
    yield put(loadingAction({isLoading: false}));
  } catch (error) {
    yield put(loadingAction({isLoading: false}));
    yield put({type: 'LOGOUT_ERROR', error});
  }
};

function* watchAuthetication() {
  yield takeLatest(authenticateUser, loginUserSaga)
}

function* watchLogout() {
  yield takeLatest(logoutUser, logoutUserSaga)
}

function* watchUnmountComp() {
  try {
    while (true) {
      yield take(cleanErrorLogin);
      yield put(cleanErrorLoginSuccess({error:''}));
    }
  } catch (error) {
    // TODO
  }
}

export default [
  watchAuthetication,
  watchLogout,
  watchUnmountComp
]
