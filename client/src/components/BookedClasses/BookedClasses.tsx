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
  <article className='class' onClick={props.clicked}>
    <h1>{props.location}</h1>
    <h2>
      {props.classType} <br /> {props.startTime}
    </h2>
    <p className='name'>{props.className}</p>
  </article>
);
export default BookedClasses;
