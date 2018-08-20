import { all } from 'redux-saga/effects';
import homeSagas from './stores/home/sagas';

const run = sagas => sagas.map(saga => saga())

export default function* rootSaga() {
  yield all([
    ...run(homeSagas)
  ])
}
