import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import DashBoardBuilder from './containers/DashBoard/DashBoardBuilder';
import GymClasses from './containers/GymClasses/GymClasses';
import Profile from './containers/Profile/Profile';
import CreateGymClass from './containers/CreateGymClass/CreateGymClass';
import Auth from './containers/Auth/Login/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/profile" component={Profile} />
            <Route path="/createGymClass" component={CreateGymClass} />
            <Route path="/classes" component={GymClasses} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={DashBoardBuilder} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
