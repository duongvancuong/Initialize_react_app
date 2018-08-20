import React  from 'react';
import Loadable from 'react-loadable';

import LoadingSpinner from '../Loading';

const LoadableComponent = getRoute => Loadable({
  loader: getRoute,
  loading: LoadingComp,
  delay: 300,
});

const LoadingComp = props => {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else {
    return <LoadingSpinner />;
  }
}

export default LoadableComponent;
