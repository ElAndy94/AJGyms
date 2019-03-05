import React from 'react';

import './DrawerToggle.scss';

interface Props {
  clicked: () => void;
}

const drawerToggle = (props: Props) => (
  <div className='DrawerToggle' onClick={props.clicked}>
    <div />
    <div />
    <div />
  </div>
);

export default drawerToggle;
