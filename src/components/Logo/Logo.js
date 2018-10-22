import React from 'react';

import logoImg from '../../assets/images/logo.svg';
import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={logoImg} alt="AJGYM" />
  </div>
);

export default logo;
