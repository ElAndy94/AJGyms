import React from "react";

import classes from './GymTimetable.css';

const gymTimetable = (props) => (
    <div class={classes.ClassContainer}>
        <div class={classes.Column}>
            <p>{props.className}</p>
        </div>
        <div class={classes.Column}>
            <p>{props.location}</p>
        </div>
        <div class={classes.Column}>
            <p>{props.startTime}</p>
        </div>
    </div>
//   <article className={classes.Class} onClick={props.clicked}>
//         <h2>{props.location}</h2>
//         <h1>{props.classType} <br/> {props.startTime}</h1>
//         <p className={classes.Name}>{props.className}</p>
//     </article>
);
export default gymTimetable;
