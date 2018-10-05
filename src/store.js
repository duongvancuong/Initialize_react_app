import { createStore, compose, applyMiddleware } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import history from './modules/history';
import middleware, { sagaMiddleware } from './middleware';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth'],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (initialState = {}) => {
  const store = createStore(
    connectRouter(history)(pReducer),
    initialState,
    compose(
      applyMiddleware(...middleware),
      process.env.NODE_ENV === 'development' && window.devToolsExtension
        ? window.devToolsExtension()
        : f => f,
    ),
  );

  sagaMiddleware.run(rootSaga);

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./rootReducer', () => {
        const nextReducer = rootReducer.default;
        store.replaceReducer(nextReducer);
      });
    }
  }

  return {
    persistor: persistStore(store),
    store,
  };
};

const { store, persistor } = configureStore();

global.store = store;

export { store, persistor };
