import { createActions } from 'redux-actions';
import { ActionsTypes } from '../../constants';

export const {
  fetchCryptocurrencyAction,
  fetchCryptocurrencyErrorAction,
  fetchCryptocurrencySuccAction,
  loadingAction,
} = createActions({
  [ActionsTypes.FETCH_CRYPTOCURRENCY_ACTION]: () => {},
  [ActionsTypes.FETCH_CRYPTOCURRENCY_ERROR_ACTION]: (payload: {}) => (payload),
  [ActionsTypes.FETCH_CRYPTOCURRENCY_SUCC_ACTION]: (payload: {}) => (payload),
  [ActionsTypes.LOADING_ACTION]: (payload: {}) => (payload),
});
