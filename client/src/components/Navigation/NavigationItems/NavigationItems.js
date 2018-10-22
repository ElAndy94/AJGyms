import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>Dash Board</NavigationItem>
    <NavigationItem link="/">Classes</NavigationItem>
  </ul>
);

export default navigationItems;
