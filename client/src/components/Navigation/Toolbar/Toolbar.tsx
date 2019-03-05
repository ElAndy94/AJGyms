import React from 'react';

import './Toolbar.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = props => (
  <header className='Toolbar'>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className='Logo'>
      <Logo />
    </div>
    <nav className='DesktopOnly'>
      <NavigationItems
        isAuthenticated={props.isAuthenticated}
        isPt={props.isPt}
        isAdmin={props.isAdmin}
      />
    </nav>
  </header>
);
export default toolbar;
