import React from 'react';
import { render } from 'react-dom';
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

const rootEl = document.getElementById('root');

render(
  <Provider store={store}>
    <SiteThemeProvider>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <App />
      </PersistGate>
    </SiteThemeProvider>
  </Provider>,
  rootEl,
);
registerServiceWorker();

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept('./components/layout/App', () => {
    render(<Provider store={store}><App /></Provider>, rootEl);
  });
}
