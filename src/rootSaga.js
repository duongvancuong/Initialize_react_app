import { all, fork } from 'redux-saga/effects';
import authSagas from './stores/auth/sagas';
import cryptocurrencySaga from './stores/cryptocurrency/sagas';

export default function* root() {
  yield all([
    fork(authSagas),
    fork(cryptocurrencySaga),
  ]);
}
