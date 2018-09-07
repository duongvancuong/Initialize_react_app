import React  from 'react';
import Loadable from 'react-loadable';

import LoadingSpinner from '../Loading';

const LoadableComponent = getRoute => Loadable({
  loader: getRoute,
  loading: LoadingComp,
  delay: 300,
  timeout: 10000,
});

const LoadingComp = props => {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.timeOut) {
    return <div>Taking a long time... <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.pastDelay) {
    return <LoadingSpinner />;
  } else {
    return null;
  }
};

export default LoadableComponent;
