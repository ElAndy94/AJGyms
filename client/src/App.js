import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import DashBoardBuilder from './containers/DashBoard/DashBoardBuilder';
import GymClasses from './containers/GymClasses/GymClasses';
import Profile from './containers/Profile/Profile';
import CreateGymClass from './containers/CreateGymClass/CreateGymClass';
import Auth from './containers/Auth/Login/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Signup from './containers/Auth/Signup/Signup';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      userId: ''
    };
  }

  handleAuthComplete = (userId) => {
    this.setState({ isAuthenticated: true, userId: userId });
  };

  handleLogout = () => {
    this.setState({ isAuthenticated: false });
    console.log(this.state.isAuthenticated);
  }

  render () {
    let routes = (
        <Switch>
          <Route path="/auth" render={props => <Auth onAuthComplete={this.handleAuthComplete} />} />
          <Route path="/signup" component={Signup} />
          <Route path="/" exact component={DashBoardBuilder} />
          <Redirect to="/" />
        </Switch>
    );

    if (this.state.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/profile" render={(props) => <Profile {...props} userId={this.state.userId} />} />
          <Route path="/classes" render={(props) => <GymClasses {...props} userId={this.state.userId} />} />
          <Route path="/createGymClass" component={CreateGymClass} />
          <Route path="/logout" render={props => <Logout onLogout={this.handleLogout} />} />
          <Route path="/" exact component={DashBoardBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout isAuthenticated={this.state.isAuthenticated}>
          {routes}
        </Layout>
      </div>
    );
  }
  // render() {
  //   return (
  //     <div>
  //       <Layout>
  //         <Switch>
  //           <Auth onAuthComplete={this.handleAuthComplete}/>
  //           <Route path="/profile" component={Profile} />
  //           <Route path="/createGymClass" component={CreateGymClass} />
  //           <Route path="/classes" component={GymClasses} />
  //           <Route path="/logout" component={Logout} />
  //           <Route path="/" exact component={DashBoardBuilder} />
  //           <Redirect to="/" />
  //         </Switch>
  //       </Layout>
  //     </div>
  //   );
  // }
}

export default App;
