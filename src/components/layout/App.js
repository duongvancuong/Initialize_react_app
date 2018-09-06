import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import { getAuthentication } from '../../selectors/authSelector';
import { logoutUser } from '../../stores/auth/actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.dispatch(logoutUser());
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <Fragment>
        <Router basename={process.env.PUBLIC_URL}>
          <Fragment>
            <Header isAuthenticated={isAuthenticated} handleLogout={this.handleLogout} />
            <Body />
            <Footer />
          </Fragment>
        </Router>
      </Fragment>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: getAuthentication(state),
  }
}

export default connect(mapStateToProps)(App);
