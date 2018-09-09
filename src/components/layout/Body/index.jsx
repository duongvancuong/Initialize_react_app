import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoadableComponent from '../../common/LoadableComponent';
import PrivateRoute from '../../common/PrivateRoute';

const fakeDelay = ms => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const Home = LoadableComponent(() => fakeDelay(1000).then(() => import('../../pages/Home')));
const Contact = LoadableComponent(() => fakeDelay(1000).then(() => import('../../pages/Contact')));
const About = LoadableComponent(() => fakeDelay(1000).then(() => import('../../pages/About')));
const Login = LoadableComponent(() => fakeDelay(1000).then(() => import('../../pages/Login')));

const Body = () => (
  <Fragment>
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute exact path="/contact" component={Contact} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={Login} />
      <Route render={() => <div>404 Page Not Found</div>} />
    </Switch>
  </Fragment>
);

export default Body;
