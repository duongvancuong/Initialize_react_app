import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoadableComponent from '../../common/LoadableComponent';

const Home = LoadableComponent(() => import('../../pages/Home'));
const Contact = LoadableComponent(() => import('../../pages/Contact'));
const About = LoadableComponent(() => import('../../pages/About'));
const Login = LoadableComponent(() => import('../../pages/Login'));

export default class componentName extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <Route render={() => <div>404 Page Not Found</div>} />
        </Switch>
      </Fragment>
    )
  }
}
