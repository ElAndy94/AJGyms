import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.scss';
import Aux from '../../../hoc/ReactAux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = props => {
  let attachedClasses = ['SideDrawer', 'Close'];
  if (props.open) {
    attachedClasses = ['SideDrawer', 'Open'];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className='Logo'>
          <Logo />
        </div>
        <nav>
          <NavigationItems
            isAuthenticated={props.isAuthenticated}
            isPt={props.isPt}
            isAdmin={props.isAdmin}
          />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
