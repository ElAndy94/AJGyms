import React from 'react';

import logoImg from '../../assets/images/logo.svg';
import './Logo.scss';

const logo = props => (
  <div className='Logo' style={{ height: props.height }}>
    <img src={logoImg} alt='AJGYM' />
  </div>
);

export default logo;
