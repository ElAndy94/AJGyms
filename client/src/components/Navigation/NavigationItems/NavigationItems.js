import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Dash Board</NavigationItem>
    <NavigationItem link="/classes">Classes</NavigationItem>
    <NavigationItem link="/profile">Profile</NavigationItem>
  </ul>
);

export default navigationItems;
