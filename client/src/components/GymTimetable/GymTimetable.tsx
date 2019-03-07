import React from 'react';

import './GymTimetable.scss';

const gymTimetable = props => (
  <article className='Gym__Class' onClick={props.clicked}>
    <h1>{props.location}</h1>
    <p>
      {props.classType} <br /> {props.startTime}
    </p>
    <p className='Gym__Class__Name'>{props.className}</p>
    <p>Instructor {props.ptName}</p>
  </article>
);
export default gymTimetable;
