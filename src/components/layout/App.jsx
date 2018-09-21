import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import { SiteThemeContext } from '../../context/SiteThemeContext';
import { getAuthentication } from '../../selectors/authSelector';
import { logoutUser } from '../../stores/auth/actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <SiteThemeContext.Consumer>
        {({ theme }) => (
          <ThemeProvider theme={theme}>
            <Router basename={process.env.PUBLIC_URL}>
              <ErrorBoundary>
                <Header isAuthenticated={isAuthenticated} handleLogout={this.handleLogout} />
                <Body />
                <Footer />
              </ErrorBoundary>
            </Router>
          </ThemeProvider>
        )}
      </SiteThemeContext.Consumer>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: getAuthentication(state),
});

export default connect(mapStateToProps)(App);
