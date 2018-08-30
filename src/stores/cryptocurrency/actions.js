import { createAction } from 'redux-actions';

export const fetchCryptocurrencyAction = createAction('FETCH_CRYPTOCURRENCY_ACTION');
export const fetchCryptocurrencyErrorAction = createAction('FETCH_CRYPTOCURRENCY_ERROR_ACTION');
export const fetchCryptocurrencySuccAction = createAction('FETCH_CRYPTOCURRENCY_SUCC_ACTION');
export const loadingAction = createAction('LOADING_ACTION');
