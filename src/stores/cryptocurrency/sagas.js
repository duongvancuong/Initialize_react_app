/* eslint-disable */
import { all, put, call, takeLatest } from 'redux-saga/effects';
import {
  getAllCryptocurrenciesLatest,
  getAllCryptocurrenciesLatestFake,
} from '../../services/api/coinMakeCapApi';

import {
  fetchCryptocurrencyAction,
  fetchCryptocurrencyErrorAction,
  fetchCryptocurrencySuccAction,
  loadingAction,
} from './actions';

export function* fetchCryptocurrency() {
  try {
    yield put(loadingAction({ isLoading: true }));
    const response = yield call(getAllCryptocurrenciesLatestFake);
    if (response.status.error_code !== 0) {
      yield put(fetchCryptocurrencyErrorAction({ error: response.status.error_code }));
    } else {
      yield [
        put(fetchCryptocurrencySuccAction(response)),
      ];
    }
    yield put(loadingAction({ isLoading: false }));
  } catch (error) {
    yield put(loadingAction({ isLoading: false }));
    yield put({ type: 'ERROR_AUTH', error });
  }
}

// function* watchFetchCryptocurrency() {
//   yield takeLatest(fetchCryptocurrencyAction, fetchCryptocurrency)
// }

export default function* root() {
  yield all([
    takeLatest(fetchCryptocurrencyAction, fetchCryptocurrency),
  ]);
}
