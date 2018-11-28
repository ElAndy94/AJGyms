import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';

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
// import * as actions from './store/actions/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      userId: '',
      userName: '',
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
          <Route path="/auth" render={(props) => <Auth {...props} onAuthComplete={this.handleAuthComplete} onUserName={this.handleUserName} isPt={this.handlePtVerification} isAdmin={this.handleAdminVerification} />} />
          <Route path="/signup" component={Signup} />
          <Route path="/" exact component={DashBoardBuilder} />
          <Redirect to="/" />
        </Switch>
    );

    if (this.state.isAuthenticated && this.state.isAdmin && this.state.isPt) {
      routes = (
        <Switch>
          <Route path="/profile" render={(props) => <Profile {...props} userId={this.state.userId} />} />
          <Route path="/classes" render={(props) => <GymClasses {...props} userId={this.state.userId} isPt={this.state.isPt} isAdmin={this.state.isAdmin} />} />
          <Route path="/myclasses" render={(props) => <BookedGymClasses {...props} userId={this.state.userId} />} />
          <Route path="/createGymClass" render={(props) => <CreateGymClass {...props} userName={this.state.userName} />} />
          <Route path="/admin" render={(props) => <Admin {...props} userId={this.state.userId} isPt={this.state.isPt} isAdmin={this.state.isAdmin} />} />
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
          <Route path="/classes" render={(props) => <GymClasses {...props} userId={this.state.userId} isPt={this.state.isPt} />} />
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

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.userId !== '',
//     userId: state.auth.userId,
//     userName: state.auth.name,
//     isAdmin: state.auth.isAdmin,
//     isPt: state.auth.isPt
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onAuth: (userInfo) => dispatch({type: actionTypes.IS_AUTH, userInfo: userInfo})
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSignup: () => dispatch( actions.authCheckState() )
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default connect(mapStateToProps)(App);
export default App;
