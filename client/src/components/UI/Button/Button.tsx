import React from 'react';

import './Button.scss';

const button = (props: any) => (
  <button
    disabled={props.disabled}
    // className='Button'
    className={['button', [props.btnType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
