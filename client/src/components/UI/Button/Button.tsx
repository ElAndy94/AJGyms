import React from 'react';

import './Button.scss';

const button = (props: any) => (
  <button
    disabled={props.disabled}
    className={['Button', [props.btnType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
