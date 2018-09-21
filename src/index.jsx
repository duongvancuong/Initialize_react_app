import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './lib';
import './styles/base/_globalStyle';
import './styles/base/_reset';
import store from './store';
import App from './components/layout/App';
import registerServiceWorker from './registerServiceWorker';
import SiteThemeProvider from './context/SiteThemeContext';

const rootEl = document.getElementById('root');

render(
  <Provider store={store}>
    <SiteThemeProvider>
      <App />
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
