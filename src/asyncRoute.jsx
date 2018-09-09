import React from 'react';
import Loadable from 'react-loadable';
import Loading from './components/common/Loading';
import store, { injectAsyncSagas, injectAsyncReducer } from './store';

const asyncRoute = getRoute => Loadable({
  loader: getRoute,
  loading() {
    return <Loading />;
  },
  render(route, props) {
    const { Component, sagas, reducer } = route.default;
    if (sagas) {
      injectAsyncSagas({
        name: sagas.name,
        sagas: sagas.sagas,
        store,
      });
    }
    if (reducer) {
      injectAsyncReducer({
        name: reducer.name,
        asyncReducer: reducer.reducer,
        store,
      });
    }
    return <Component {...props} />;
  },
});

export default asyncRoute;
