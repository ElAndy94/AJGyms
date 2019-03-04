import React from 'react';

import './BookedClasses.scss';

const BookedClasses = props => (
  <article className='Class' onClick={props.clicked}>
    <h2>{props.location}</h2>
    <h1>
      {props.classType} <br /> {props.startTime}
    </h1>
    <p className='Name'>{props.className}</p>
  </article>
);
export default BookedClasses;
