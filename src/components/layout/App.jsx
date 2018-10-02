import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';

import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import { SiteThemeContext } from '../../context/SiteThemeContext';
import { getAuthentication } from '../../selectors/authSelector';
import { logoutUser } from '../../stores/auth/actions';
import history from '../../modules/history';

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
      <ConnectedRouter history={history}>
        <SiteThemeContext.Consumer>
          {({ theme }) => (
            <ThemeProvider theme={theme}>
              <ErrorBoundary>
                <Header isAuthenticated={isAuthenticated} handleLogout={this.handleLogout} />
                <Body />
                <Footer />
              </ErrorBoundary>
            </ThemeProvider>
          )}
        </SiteThemeContext.Consumer>
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: getAuthentication(state),
});

export default connect(mapStateToProps)(App);
