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
  let attachedClasses = ['sidedrawer', 'close'];
  if (props.open) {
    attachedClasses = ['sidedrawer', 'open'];
  }
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className='logo'>
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
