import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import './SideDrawer.scss';

interface Props {
  isAuthenticated: boolean;
  isPt: boolean;
  isAdmin: boolean;
  open: any;
  closed: any;
}

const sideDrawer = (props: Props) => {
  let attachedClasses = ['SideDrawer', 'Close'];
  if (props.open) {
    attachedClasses = ['SideDrawer', 'Open'];
  }
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default sideDrawer;
