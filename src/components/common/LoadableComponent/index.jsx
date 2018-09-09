import React from 'react';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';


import LoadingSpinner from '../Loading';

const LoadingComp = (props) => {
  const {
    retry,
    pastDelay,
    timeOut,
    error,
  } = props;

  if (error) {
    return (
      <div>
        <span>Error!</span>
        <button type="button" onClick={retry}>Retry</button>
      </div>
    );
  }

  if (timeOut) {
    return (
      <div>
        <span>Taking a long time... </span>
        <button type="button" onClick={retry}>Retry</button>
      </div>
    );
  }

  if (pastDelay) {
    return <LoadingSpinner />;
  }
  return null;
};

const LoadableComponent = getRoute => Loadable({
  loader: getRoute,
  loading: LoadingComp,
  delay: 300,
  timeout: 10000,
});

LoadingComp.defaultProps = {
  timeOut: false,
  error: null,
};

LoadingComp.propTypes = {
  retry: PropTypes.func.isRequired,
  pastDelay: PropTypes.bool.isRequired,
  timeOut: PropTypes.bool,
  error: PropTypes.object,
};

export default LoadableComponent;
