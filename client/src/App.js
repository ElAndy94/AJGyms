import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import DashBoardBuilder from './containers/DashBoard/DashBoardBuilder';
import GymClasses from './containers/GymClasses/GymClasses';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/classes" component={GymClasses} />
            <Route path="/" exact component={DashBoardBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;