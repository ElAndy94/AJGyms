import React from 'react';

import './User.scss';

const user = props => (
  <article className='User' onClick={props.clicked}>
    <h2>{props.name}</h2>
    <p className='Details'>
      {props.email} <br /> <br /> {props.address} <br /> <br />
      {props.contract} <br /> <br /> {props.date} <br /> <br />
      {props.payment} <br /> <br /> {props.gymLocation} <br /> <br />
    </p>
    <div className='Details'>
      {props.pt ? <div> Personal Trainer </div> : <div> </div>}
    </div>
  </article>
);
export default user;
