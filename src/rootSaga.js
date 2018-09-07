import { all } from 'redux-saga/effects';
import authSagas from './stores/auth/sagas';

const run = sagas => sagas.map(saga => saga());

export default function* rootSaga() {
  yield all([
    ...run(authSagas)
  ]);
}
