import _ from 'lodash';

const localStorageKey = 'react_app_state';

export const saveLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    // Nothing to do
  }
};

export const loadLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return undefined;
  }
};

export const deleteLocalStorage = (key) => {
  localStorage.removeItem(key);
};
