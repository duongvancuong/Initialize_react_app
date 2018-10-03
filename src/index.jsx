import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import './lib';
import './styles/base/_globalStyle';
import './styles/base/_reset';
import { store, persistor } from './reduxPersistStore';
import App from './components/layout/App';
import registerServiceWorker from './registerServiceWorker';
import SiteThemeProvider from './context/SiteThemeContext';
import Loading from './components/common/Loading';

export const init = {
  fetchRetries: 0,

  run() {
    if (process.env.NODE_ENV !== 'production') {
      this.render(App);
      return Promise.resolve();
    }
    this.initOfflinePlugin();

    return Promise
      .resolve()
      .then(() => this.render(App))
      .catch(reason => {
        if (this.fetchRetries < 3) {
          console.log('reload'); //eslint-disable-line no-console
          this.fetchRetries++;
          this.run();
        }
        console.log(reason); //eslint-disable-line no-console
      });
  },
  initOfflinePlugin() {
    const OfflinePlugin = require('offline-plugin/runtime');

    OfflinePlugin.install({
      onUpdateReady: () => {
        console.log('SW Event:', 'onUpdateReady'); //eslint-disable-line no-console
        OfflinePlugin.applyUpdate();
      },
      onUpdated: () => {
        console.log('SW Event:', 'onUpdated'); //eslint-disable-line no-console
        window.location.reload();
      },
    });
  },
  render(Component) {
    const root = document.getElementById('root');

    if (root) {
      ReactDOM.render(
        <AppContainer>
          <Provider store={store}>
            <SiteThemeProvider>
              <PersistGate loading={<Loading />} persistor={persistor}>
                <Component />
              </PersistGate>
            </SiteThemeProvider>
          </Provider>
        </AppContainer>,
        root
      );
    }
  },
};

init.run();

registerServiceWorker();

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept('./components/layout/App', () => init.run(App));
}
