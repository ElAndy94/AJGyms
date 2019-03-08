import React from 'react';

import './GymTimetable.scss';

const gymTimetable = props => (
  <article className='gym__class' onClick={props.clicked}>
    <h1>{props.location}</h1>
    <p>
      {props.classType} <br /> {props.startTime}
    </p>
    <p className='gym__class__name'>{props.className}</p>
    <p>Instructor {props.ptName}</p>
  </article>
);
export default gymTimetable;
