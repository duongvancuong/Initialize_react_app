import { all, fork } from 'redux-saga/effects';
import authSagas from './stores/auth/sagas';

export default function* root() {
  yield all([
    fork(authSagas),
  ]);
}
