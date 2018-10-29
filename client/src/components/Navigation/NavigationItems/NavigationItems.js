import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Dash Board</NavigationItem>
    <NavigationItem link="/profile">Profile</NavigationItem>
    <NavigationItem link="/classes">Classes</NavigationItem>
    <NavigationItem link="/createGymClass">Create Class</NavigationItem>
    <NavigationItem link="/auth" >Login</NavigationItem>
  </ul>
);

export default navigationItems;
