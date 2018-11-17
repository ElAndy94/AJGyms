import React from "react";

import classes from './AdminComp.css';

const AdminComp = (props) => (
  <h1 className={classes.Heading}> Hello </h1>
  // <article className={classes.Class} onClick={props.clicked}>
  //       <h2>{props.location}</h2>
  //       <h1>{props.classType} <br/> {props.startTime}</h1>
  //       <p className={classes.Name}>{props.className}</p>
  //       <p>Instructor {props.ptName}</p>
  //   </article>
);
export default AdminComp;
