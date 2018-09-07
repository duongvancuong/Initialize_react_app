import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import './lib';
import './styles/base/_globalStyle';
import './styles/base/_reset';
import store from './store';
import App from './components/layout/App';
import { theme } from './styles/abstracts/theme';
import registerServiceWorker from './registerServiceWorker';

const rootEl = document.getElementById('root');

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  rootEl
);
registerServiceWorker();

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept('./components/layout/App', () => {
    render(<Provider store={store}><App /></Provider>, rootEl);
  });
}
