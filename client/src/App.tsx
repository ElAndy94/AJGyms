import React from 'react';
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

interface Props {
  isAuthenticated?: boolean;
  isAdmin?: boolean;
  isPt?: boolean;
  userId?: string;
  userName?: string;
}

const app = (props: Props) => {
  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/signup' component={Signup} />
      <Route path='/' exact component={DashBoardBuilder} />
      <Redirect to='/' />
    </Switch>
  );

  if (props.isAuthenticated && props.isAdmin && props.isPt) {
    routes = (
      <Switch>
        <Route path='/profile' component={Profile} />
        <Route path='/classes' component={GymClasses} userId={props.userId} />
        <Route
          path='/myclasses'
          component={BookedGymClasses}
          userId={props.userId}
        />
        <Route
          path='/createGymClass'
          component={CreateGymClass}
          userId={props.userId}
        />
        <Route path='/admin' component={Admin} />
        <Route path='/logout' render={() => <Logout />} />
        <Route path='/' exact component={DashBoardBuilder} />
        <Redirect to='/' />
      </Switch>
    );
  }

  if (props.isAuthenticated && props.isPt && !props.isAdmin) {
    routes = (
      <Switch>
        <Route path='/profile' component={Profile} userId={props.userId} />
        <Route path='/classes' component={GymClasses} userId={props.userId} />
        <Route
          path='/myclasses'
          component={BookedGymClasses}
          userId={props.userId}
        />
        <Route
          path='/createGymClass'
          component={CreateGymClass}
          userId={props.userId}
        />
        <Route path='/logout' render={() => <Logout />} />
        <Route path='/' exact component={DashBoardBuilder} />
        <Redirect to='/' />
      </Switch>
    );
  }

  if (props.isAuthenticated && !props.isPt) {
    routes = (
      <Switch>
        <Route path='/profile' component={Profile} />
        <Route path='/classes' component={GymClasses} userId={props.userId} />
        <Route
          path='/myclasses'
          component={BookedGymClasses}
          userId={props.userId}
        />
        <Route path='/logout' render={() => <Logout />} />
        <Route path='/' exact component={DashBoardBuilder} />
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <Layout
      isAuthenticated={props.isAuthenticated}
      isPt={props.isPt}
      isAdmin={props.isAdmin}
    >
      {routes}
    </Layout>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.userId !== '',
  userId: state.auth.userId,
  userName: state.auth.name,
  isAdmin: state.auth.isAdmin,
  isPt: state.auth.isPt
});

export default withRouter(
  // @ts-ignore: connect error
  connect(
    mapStateToProps,
    null
  )(app)
);
