import { put, call, takeLatest, select } from 'redux-saga/effects';
import { login, logout } from '../../services/auth';

import {
  requestLoginAction,
  authticatedAction,
  authErrorAction,
  loadingAction,
  logoutAction,
  logoutedAction,
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

export function* loginUser(data) {
  try {
    yield put(loadingAction({isLoading: true}));
    const { token, error_code } = yield call(login, data.payload);
    if (error_code) {
      yield put(authErrorAction({ error: error_code }));
    } else {
      const payload = auth_login(token);
      yield [
        put(authticatedAction(payload)),
      ];
    }
    yield put(loadingAction({isLoading: false}));
  } catch (error) {
    yield put(loadingAction({isLoading: false}));
    yield put({type: 'ERROR_AUTH', error });
  }
};

export function* logoutUser() {
  try {
    yield put(loadingAction({isLoading: true}));
    const token = yield select(getToken)
    yield call(logout, token);
    yield [
      put(logoutedAction(auth_logout)),
    ];
    yield put(loadingAction({isLoading: false}));
  } catch (error) {
    yield put(loadingAction({isLoading: false}));
    yield put({type: 'LOGOUT_ERROR', error});
  }
};

function* watchAuthetication() {
  yield takeLatest(requestLoginAction, loginUser)
}

function* watchLogout() {
  yield takeLatest(logoutAction, logoutUser)
}

export default [
  watchAuthetication,
  watchLogout
]
