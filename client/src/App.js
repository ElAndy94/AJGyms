import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
  render () {
    let routes = (
        <Switch>
          <Route path="/auth" render={(props) => <Auth {...props} onAuthComplete={this.handleAuthComplete} onUserName={this.handleUserName} isPt={this.handlePtVerification} isAdmin={this.handleAdminVerification} />} />
          <Route path="/signup" component={Signup} />
          <Route path="/" exact component={DashBoardBuilder} />
          <Redirect to="/" />
        </Switch>
    );

    if (this.props.isAuthenticated && this.props.isAdmin && this.props.isPt) {
      routes = (
        <Switch>
          <Route path="/profile" render={(props) => <Profile {...props} userId={this.props.userId} />} />
          <Route path="/classes" render={(props) => <GymClasses {...props} userId={this.props.userId} isPt={this.props.isPt} isAdmin={this.props.isAdmin} />} />
          <Route path="/myclasses" render={(props) => <BookedGymClasses {...props} userId={this.props.userId} />} />
          <Route path="/createGymClass" render={(props) => <CreateGymClass {...props} userName={this.props.userName} />} />
          <Route path="/admin" render={(props) => <Admin {...props} userId={this.props.userId} isPt={this.props.isPt} isAdmin={this.props.isAdmin} />} />
          <Route path="/logout" render={() => <Logout onLogout={this.handleLogout} />} />
          <Route path="/" exact component={DashBoardBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    if (this.props.isAuthenticated && this.props.isPt && !this.props.isAdmin) {
      routes = (
        <Switch>
          <Route path="/profile" render={(props) => <Profile {...props} userId={this.props.userId} />} />
          <Route path="/classes" render={(props) => <GymClasses {...props} userId={this.props.userId} isPt={this.props.isPt} />} />
          <Route path="/myclasses" render={(props) => <BookedGymClasses {...props} userId={this.props.userId} />} />
          <Route path="/createGymClass" render={(props) => <CreateGymClass {...props} userName={this.props.userName} />} />
          <Route path="/logout" render={() => <Logout onLogout={this.handleLogout} />} />
          <Route path="/" exact component={DashBoardBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    if (this.props.isAuthenticated && !this.props.isPt) {
      routes = (
        <Switch>
          <Route path="/profile" render={(props) => <Profile {...props} userId={this.props.userId} />} />
          <Route path="/classes" render={(props) => <GymClasses {...props} userId={this.props.userId} />} />
          <Route path="/myclasses" render={(props) => <BookedGymClasses {...props} userId={this.props.userId} />} />
          <Route path="/logout" render={() => <Logout onLogout={this.handleLogout} />} />
          <Route path="/" exact component={DashBoardBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout isAuthenticated={this.props.isAuthenticated} isPt={this.props.isPt} isAdmin={this.props.isAdmin} >
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.userId !== '',
  userId: state.auth.userId,
  userName: state.auth.name,
  isAdmin: state.auth.isAdmin,
  isPt: state.auth.isPt
});

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
// export default App;
export default withRouter(connect(mapStateToProps, null)(App));
