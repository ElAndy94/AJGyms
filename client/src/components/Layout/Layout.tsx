import React, { useState } from 'react';

import './Layout.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

interface Props {
  isAuthenticated: boolean;
  isPt: boolean;
  isAdmin: boolean;
  children: any;
}

const layout = (props: Props) => {
  const [sideDrawer, setSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    if (sideDrawer === true) {
      setSideDrawer(false);
    } else {
      setSideDrawer(true);
    }
  };

  return (
    <React.Fragment>
      <Toolbar
        isAuthenticated={props.isAuthenticated}
        isPt={props.isPt}
        isAdmin={props.isAdmin}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuthenticated={props.isAuthenticated}
        isPt={props.isPt}
        isAdmin={props.isAdmin}
        open={sideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className='Content'>{props.children}</main>
    </React.Fragment>
  );
};

export default layout;
