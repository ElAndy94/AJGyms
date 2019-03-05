import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.scss';

interface Props {
  isAuthenticated: boolean;
  isPt: boolean;
  isAdmin: boolean;
}

const navigationItems = (props: Props) => (
  <ul className='NavigationItems'>
    <NavigationItem link='/' exact>
      Dash Board
    </NavigationItem>
    {props.isAuthenticated && props.isPt && props.isAdmin ? (
      <React.Fragment>
        <NavigationItem link='/profile'>Profile</NavigationItem>
        <NavigationItem link='/classes'>Classes</NavigationItem>
        <NavigationItem link='/createGymClass'>Create Class</NavigationItem>
        <NavigationItem link='/admin'>Admin</NavigationItem>
        <NavigationItem link='/logout'>Logout</NavigationItem>
      </React.Fragment>
    ) : props.isAuthenticated && props.isPt && !props.isAdmin ? (
      <React.Fragment>
        <NavigationItem link='/profile'>Profile</NavigationItem>
        <NavigationItem link='/classes'>Classes</NavigationItem>
        <NavigationItem link='/createGymClass'>Create Class</NavigationItem>
        <NavigationItem link='/logout'>Logout</NavigationItem>
      </React.Fragment>
    ) : props.isAuthenticated && !props.isPt ? (
      <React.Fragment>
        <NavigationItem link='/profile'>Profile</NavigationItem>
        <NavigationItem link='/classes'>Classes</NavigationItem>
        <NavigationItem link='/myclasses'>Booked Class</NavigationItem>
        <NavigationItem link='/logout'>Logout</NavigationItem>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <NavigationItem link='/auth'>Login</NavigationItem>
        <NavigationItem link='/signup'>Sign Up</NavigationItem>
      </React.Fragment>
    )}
  </ul>
);

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.userId !== '',
//   isAdmin: state.auth.isAdmin,
//   isPt: state.auth.isPt
// });

export default navigationItems;
