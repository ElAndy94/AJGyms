import React from "react";

import classes from './BookedClasses.css';

const BookedClasses = (props) => (
  <article className={classes.Class} onClick={props.clicked}>
        <h2>{props.location}</h2>
        <h1>{props.classType} <br/> {props.startTime}</h1>
        <p className={classes.Name}>{props.className}</p>
    </article>
);
export default BookedClasses;
