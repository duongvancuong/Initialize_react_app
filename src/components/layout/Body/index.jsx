import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoadableComponent from '../../common/LoadableComponent';

const Home = LoadableComponent(() => import('../../pages/Home'));
const Contact = LoadableComponent(() => import('../../pages/Contact'));
const About = LoadableComponent(() => import('../../pages/About'));

export default class componentName extends Component {
  render() {
    return (
      <div className="body">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />
          <Route render={() => <div>404 Page Not Found</div>} />
        </Switch>
      </div>
    )
  }
}
