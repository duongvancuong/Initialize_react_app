import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Body from './Body';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
          <div className="container-fluid">
            <Header />
            <Body />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
