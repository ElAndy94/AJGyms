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
import BookedGymClasses from './containers/GymClasses/BookedGymClasses/BookedGymClasses';
import Admin from './containers/Admin/Admin';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      userName: '',
      userId: '',
      isPt: false,
      isAdmin: false
    };
  }

  handleAuthComplete = (userId) => {
    this.setState({ isAuthenticated: true, userId: userId });
  };

  handleLogout = () => {
    this.setState({ isAuthenticated: false, userId: '', isPt: false, isAdmin: false });
  };

  handleUserName = (userName) => {
    this.setState({ userName: userName });
  }

  handlePtVerification = () => {
    this.setState({ isPt: true });
  }

  handleAdminVerification = () => {
    this.setState({ isAdmin: true });
  }

  render () {
    let routes = (
        <Switch>
          <Route path="/auth" render={props => <Auth onAuthComplete={this.handleAuthComplete} onUserName={this.handleUserName} isPt={this.handlePtVerification} isAdmin={this.handleAdminVerification} />} />
          <Route path="/signup" component={Signup} />
          <Route path="/" exact component={DashBoardBuilder} />
          <Redirect to="/" />
        </Switch>
    );

    if (this.state.isAuthenticated && this.state.isAdmin && this.state.isPt) {
      routes = (
        <Switch>
          <Route path="/profile" render={(props) => <Profile {...props} userId={this.state.userId} />} />
          <Route path="/classes" render={(props) => <GymClasses {...props} userId={this.state.userId} />} />
          <Route path="/myclasses" render={(props) => <BookedGymClasses {...props} userId={this.state.userId} />} />
          <Route path="/createGymClass" render={(props) => <CreateGymClass {...props} userName={this.state.userName} />} />
          <Route path="/admin" render={(props) => <Admin {...props} userId={this.state.userId} />} />
          <Route path="/logout" render={() => <Logout onLogout={this.handleLogout} />} />
          <Route path="/" exact component={DashBoardBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    if (this.state.isAuthenticated && this.state.isPt && !this.state.isAdmin) {
      routes = (
        <Switch>
          <Route path="/profile" render={(props) => <Profile {...props} userId={this.state.userId} />} />
          <Route path="/classes" render={(props) => <GymClasses {...props} userId={this.state.userId} />} />
          <Route path="/myclasses" render={(props) => <BookedGymClasses {...props} userId={this.state.userId} />} />
          <Route path="/createGymClass" render={(props) => <CreateGymClass {...props} userName={this.state.userName} />} />
          <Route path="/logout" render={() => <Logout onLogout={this.handleLogout} />} />
          <Route path="/" exact component={DashBoardBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    if (this.state.isAuthenticated && !this.state.isPt) {
      routes = (
        <Switch>
          <Route path="/profile" render={(props) => <Profile {...props} userId={this.state.userId} />} />
          <Route path="/classes" render={(props) => <GymClasses {...props} userId={this.state.userId} />} />
          <Route path="/myclasses" render={(props) => <BookedGymClasses {...props} userId={this.state.userId} />} />
          <Route path="/logout" render={() => <Logout onLogout={this.handleLogout} />} />
          <Route path="/" exact component={DashBoardBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout isAuthenticated={this.state.isAuthenticated} isPt={this.state.isPt} isAdmin={this.state.isAdmin} >
        {routes}
      </Layout>
    );
  }
}

export default App;
