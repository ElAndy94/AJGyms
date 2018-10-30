import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
import Aux from '../../../hoc/ReactAux';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Dash Board</NavigationItem>
    { props.isAuthenticated ?
      <Aux>
        <NavigationItem link="/profile">Profile</NavigationItem>
        <NavigationItem link="/classes">Classes</NavigationItem>
        <NavigationItem link="/createGymClass">Create Class</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Aux>
      :
      <Aux>
        <NavigationItem link="/signup" >SignUp</NavigationItem>
        <NavigationItem link="/auth" >Login</NavigationItem>
      </Aux>
    }
  </ul>
);

export default navigationItems;
