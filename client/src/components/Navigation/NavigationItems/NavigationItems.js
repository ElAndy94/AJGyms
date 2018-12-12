import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
import Aux from '../../../hoc/ReactAux';


const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Dash Board</NavigationItem>
    {
      props.isAuthenticated && props.isPt && props.isAdmin ?
      <Aux>
        <NavigationItem link="/profile">Profile</NavigationItem>
        <NavigationItem link="/classes">Classes</NavigationItem>
        <NavigationItem link="/createGymClass">Create Class</NavigationItem>
        <NavigationItem link="/admin">Admin</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Aux>
      :
      props.isAuthenticated && props.isPt && !props.isAdmin ?
      <Aux>
        <NavigationItem link="/profile">Profile</NavigationItem>
        <NavigationItem link="/classes">Classes</NavigationItem>
        <NavigationItem link="/createGymClass">Create Class</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Aux>
      :
      ( props.isAuthenticated && !props.isPt ?
      <Aux>
        <NavigationItem link="/profile">Profile</NavigationItem>
        <NavigationItem link="/classes">Classes</NavigationItem>
        <NavigationItem link="/myclasses">Booked Class</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Aux>
      :
      <Aux>
        <NavigationItem link="/auth" >Login</NavigationItem>
        <NavigationItem link="/signup" >Sign Up</NavigationItem>
      </Aux>
      )
    }
  </ul>
);

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.userId !== '',
//   isAdmin: state.auth.isAdmin,
//   isPt: state.auth.isPt
// });


export default navigationItems;
