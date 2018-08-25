import { put, call, takeLatest } from 'redux-saga/effects';
import { login } from '../../services/auth';

import {
  requestLoginAction,
  authticatedAction,
  authErrorAction,
  loadingAction,
} from './actions';

const auth_login = (token) =>({
  isAuthenticated: true,
  token: token.token,
  refresh_token: token.refresh_token,
  expired_at: token.expired_at,
  error: '',
});

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
    yield put({type: 'ERROR_AUTH', error });
  }
};

function* watchAuthetication() {
  yield takeLatest(requestLoginAction, loginUser)
}

export default [
  watchAuthetication
]
