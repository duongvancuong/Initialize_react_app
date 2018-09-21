/* eslint-disable */
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { createReducer } from './rootReducer';
import rootSaga from './rootSaga';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth'],
 };

const pReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const store = createStore(
    pReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      process.env.NODE_ENV === 'development' && window.devToolsExtension
        ? window.devToolsExtension()
        : f => f,
    ),
  );
  sagaMiddleware.run(rootSaga);
  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./rootReducer', () => {
        store.replaceReducer(createReducer(store.asyncReducers));
      });
    }
  }
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = store.asyncReducers || {};
  store.asyncSagas = store.asyncSagas || [];
  return store;
};

export const store = configureStore();

export const persistor = persistStore(store);
