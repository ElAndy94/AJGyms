import React from 'react';

import './GymTimetable.scss';

const gymTimetable = props => (
  <article className='Class' onClick={props.clicked}>
    <h2>{props.location}</h2>
    <h1>
      {props.classType} <br /> {props.startTime}
    </h1>
    <p className='Name'>{props.className}</p>
    <p>Instructor {props.ptName}</p>
  </article>
);
export default gymTimetable;
