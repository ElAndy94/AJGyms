import React from "react";

import classes from './User.css';

const user = (props) => (
  <article className={classes.User} onClick={props.clicked}>
        <h2>{props.name}</h2>
        <p className={classes.Details}>
        {props.email} <br /> <br /> {props.address} <br /> <br />
        {props.contract} <br /> <br /> {props.date} <br /> <br />
        {props.payment}  <br /> <br /> {props.gymLocation} <br /> <br />
        </p>
        <div className={classes.Details}>{ props.pt ?  <div> Personal Trainer </div> : <div> </div> }</div>
    </article>
);
export default user;
