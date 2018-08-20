import _ from 'lodash';

const localStorageKey = 'react_app_state';

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(localStorageKey, serializedState);
  } catch (error) {

  }
};

export const loadState = () => {
  try {
    const stateLoaded = JSON.parse(localStorage.getItem(localStorageKey));
    const expiredAt = new Date(stateLoaded.auth.expiredAt);
    switch (true) {
      case (expiredAt && expiredAt < new Date()):
        return {
          ...stateLoaded,
          auth: {
            isAuthenticated: false,
            token: '',
            expiredAt: '',
          },
        };
      default:
        return { ...stateLoaded };
    }
  } catch (err) {
    return undefined;
  }
};

export const subscribeStore = (store) => {
  store.subscribe(_.throttle(() => {
    saveState({
      auth: store.getState().auth,
    });
  }, 1000));
};

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
