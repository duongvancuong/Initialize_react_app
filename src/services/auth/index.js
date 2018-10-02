import { UnauthenticatedRequest, AutheticatedRequest } from '../api';
import config from '../../config';

const URL_LOGIN = '/auth/login';
const URL_REGISTER = '/signup';
const URL_LOGOUT = '/auth/logout';

const CONFIG_OPTION = {
  baseURL: config.baseURL,
  timeout: 10000,
  params: {},
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const login = data => UnauthenticatedRequest(CONFIG_OPTION).post({
  url: URL_LOGIN,
  data,
}).then(res => res.data).catch(error => error.response.data);

export const register = data => UnauthenticatedRequest(CONFIG_OPTION).post({
  url: URL_REGISTER,
  data,
}).then(res => res.data).catch(error => error.response.data);

export const logout = (token) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const CONFIG_OPTION_AUTHENTICATION = { ...CONFIG_OPTION, headers };
  return AutheticatedRequest(CONFIG_OPTION_AUTHENTICATION).delete({
    url: URL_LOGOUT,
  }).then(res => res.data).catch(error => error.response.data);
};
