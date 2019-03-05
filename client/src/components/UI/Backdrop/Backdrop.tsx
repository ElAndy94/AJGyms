import React from 'react';

import './Backdrop.scss';

interface Props {
  show: boolean;
  clicked: () => void;
}

const backdrop = (props: Props) =>
  props.show ? <div className='Backdrop' onClick={props.clicked} /> : null;

export default backdrop;
