/* eslint-disable */
import { combineActions, handleActions } from 'redux-actions';

import {
  fetchCryptocurrencyAction,
  fetchCryptocurrencyErrorAction,
  fetchCryptocurrencySuccAction,
  loadingAction,
} from './actions';

const initialState = {
  status: {},
  data: [],
  isLoading: false,
  error: '',
}

const cryptocurrency = handleActions({
  [combineActions(fetchCryptocurrencyAction, fetchCryptocurrencyErrorAction, loadingAction, fetchCryptocurrencySuccAction)]: (state, action) => ({
    ...state, ...action.payload
  })},
  initialState
);

export default cryptocurrency;
