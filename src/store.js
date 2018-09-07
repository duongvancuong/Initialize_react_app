import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { createReducer } from './rootReducer';
import rootSaga from './rootSaga';
import { subscribeStore, loadState } from './services/localstorage';

const persistedState = loadState();
const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(sagaMiddleware),
      process.env.NODE_ENV === 'development' && window.devToolsExtension
        ? window.devToolsExtension()
        : f => f
    )
  );
  sagaMiddleware.run(rootSaga);
  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./rootReducer', () => {
        store.replaceReducer(createReducer(store.asyncReducers));
      });
    }
  }
  subscribeStore(store);
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = store.asyncReducers || {};
  store.asyncSagas = store.asyncSagas || [];
  return store;
};

export const injectAsyncReducer = ({ name, asyncReducer, store }) => {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
};

export function injectAsyncSagas({ name, sagas, store }) {
  if (!store.asyncSagas.includes(name)) {
    sagas.forEach(store.runSaga);
    store.asyncSagas.push(name);
  }
}

export default configureStore();
