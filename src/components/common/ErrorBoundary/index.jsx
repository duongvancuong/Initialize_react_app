import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
  }

  render() {
    const { children, errorMessage } = this.props;
    if (this.state.hasError) {
      return <h1>{errorMessage}</h1>;
    }

    return (
      <Fragment>
        {children}
      </Fragment>
    );
  }
}

ErrorBoundary.defaultProps = {
  errorMessage: 'Something went wrong.',
};

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  errorMessage: PropTypes.string,
};

export default ErrorBoundary;
