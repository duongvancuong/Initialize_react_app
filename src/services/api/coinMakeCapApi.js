/* eslint-disable */
import { UnauthenticatedRequest } from './index';
import config from '../../config';
import { fakeDateSucc, fakeDateError } from '../mock/cryptocurrency';

const API_BASE = '/v1';
const API_BASE_URL = config.baseURLCoinMaker;
const CONFIG_OPTION = {
  baseURL: API_BASE_URL + API_BASE,
  timeout: 10000,
  params:{},
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CMC_PRO_API_KEY': process.env.X_CMC_PRO_API_KEY,
  }
};

export const getAllCryptocurrenciesLatest = () => {
  const params = {
    start: 1,
    limit:100,
    convert:'USD'
  }

  return UnauthenticatedRequest(CONFIG_OPTION).get({
    url: '/cryptocurrency/listings/latest',
    params
  }).then((successfulRes) => {
    return successfulRes;
  }).catch((error) => {
    return error.data;
  });
};

export const getAllCryptocurrenciesLatestFake = () => {
  return Promise.resolve(fakeDateSucc).then((successfulRes) => {
    return successfulRes;
  });
}

export const getAllCryptocurrenciesLatestFakeSuc = (ms) => () => {
  return new Promise(resolve => setTimeout(() => resolve(fakeDateSucc), ms));
}

export const getAllCryptocurrenciesLatestFakeFail = (ms) => () => {
  return new Promise((resolve, reject) => setTimeout(() => reject(fakeDateError), ms));
}
