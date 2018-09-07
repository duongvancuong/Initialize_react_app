import { UnauthenticatedRequest, AutheticatedRequest } from '../api';
import config from '../../config';

const URL_LOGIN = '/auth/login';
const URL_REGISTER = '/signup';
const URL_LOGOUT = '/auth/logout';

const CONFIG_OPTION = {
  baseURL: config.baseURL,
  timeout: 10000,
  params:{},
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

export const login = (data) => {
  return UnauthenticatedRequest(CONFIG_OPTION).post({
    url: URL_LOGIN,
    data
  }).then((res) => {
    return res.data;
  }).catch(({response}) => {
    return response.data;
  });
};

export const register = (data) => {
  return UnauthenticatedRequest(CONFIG_OPTION).post({
    url: URL_REGISTER,
    data
  }).then((res)=>{
    return res.data;
  }).catch((error) => {
    return error.data;
  });
};

export const logout = (token) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const CONFIG_OPTION_AUTHENTICATION = {...CONFIG_OPTION, headers};
  return AutheticatedRequest(CONFIG_OPTION_AUTHENTICATION).delete({
    url: URL_LOGOUT
  }).then((res)=>{
    return res.data;
  }).catch((error) => {
    return error.data;
  });
};
