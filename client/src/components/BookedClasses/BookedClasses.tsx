import React from 'react';

import './BookedClasses.scss';

interface Props {
  clicked: () => void;
  classType: string;
  startTime: string;
  className: string;
  location: string;
}

const BookedClasses = (props: Props) => (
  <article className='Class' onClick={props.clicked}>
    <h2>{props.location}</h2>
    <h1>
      {props.classType} <br /> {props.startTime}
    </h1>
    <p className='Name'>{props.className}</p>
  </article>
);
export default BookedClasses;
