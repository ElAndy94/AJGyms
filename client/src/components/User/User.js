import React from "react";

import classes from './User.css';

const user = (props) => (
  <article className={classes.User} onClick={props.clicked}>
        <h2>{props.name}</h2>
        <p className={classes.Details}>{props.email}</p>
        <p className={classes.Details}>{props.address}</p>
        <p className={classes.Details}>{props.contract}</p>
        <p className={classes.Details}>{props.date}</p>
        <p className={classes.Details}>{props.payment}</p>
        <p className={classes.Details}>{props.goal}</p>
        <p className={classes.Details}>{props.gymLocation}</p>
        <p className={classes.Details}>{ props.pt ?  <p> Personal Trainer </p> : <p> </p> }</p>
    </article>
);
export default user;
