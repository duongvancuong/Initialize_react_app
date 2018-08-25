import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Body from './Body';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router basename={process.env.PUBLIC_URL}>
          <Fragment>
            <Header />
            <Body />
            <Footer />
          </Fragment>
        </Router>
      </Fragment>
    );
  }
}

export default App;
