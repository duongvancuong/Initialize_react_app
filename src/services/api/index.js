import axios from 'axios';
import config from '../../config';

const API_BASE = '/api';
const ACCESSTOKEN_VALUE_PREFIX = 'Bearer';
const DEFAULT_CONFIG = {
  baseURL: config.baseURL + API_BASE,
  timeout: 10000,
  params:{},
};

class HttpRequest {
  constructor(headers, options) {
    this.config = Object.assign({}, DEFAULT_CONFIG, { headers, ...options });
  }

  get({ url, params = {}, adapter }) {
    return this.executeRequest(url, {
      method: 'GET',
      params,
      adapter,
    });
  }

  post({ url, data = {}, adapter }) {
    return this.executeRequest(url, {
      method: 'POST',
      data,
      adapter,
    });
  }

  put({ url, params = {}, adapter }) {
    return this.executeRequest(url, {
      method: 'PUT',
      params,
      adapter,
    });
  }

  delete({ url, params = {}, adapter }) {
    return this.executeRequest(url, {
      method: 'DELETE',
      params,
      adapter,
    });
  }

  patch({ url, data = {}, adapter }) {
    return this.executeRequest(url, {
      method: 'PATCH',
      data,
      adapter,
    });
  }

  executeRequest(url, config) {
    const finalConfig = Object.assign({}, this.config, { url, ...config });
    return axios.request(finalConfig)
      .then(successResponse => Promise.resolve(successResponse))
      .catch((errorResponse) => {
        return Promise.reject(errorResponse);
      });
  }
}

export const AutheticatedRequest = (options = {}) => new HttpRequest({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Auth-Token': `${ACCESSTOKEN_VALUE_PREFIX}`,
}, options);

export const UnauthenticatedRequest = (options= {}) => new HttpRequest({
  Accept: 'application/json',
  'Content-Type': 'application/json',
}, options);

export const AuthenticatedFormDataRequest = (options = {}) => new HttpRequest({
  Accept: 'application/json',
  'Content-Type': 'multipart/form-data',
  'X-Auth-Token': `${ACCESSTOKEN_VALUE_PREFIX}`,
}, options);

export const UnauthenticatedFormRequest = (options = {}) => new HttpRequest({
  Accept: 'application/json',
  'Content-Type': 'multipart/form-data',
}, options);
