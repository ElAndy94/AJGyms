import React from "react";

import classes from './AdminComp.css';
import Button from '../UI/Button/Button';

const AdminComp = (props) => {
  return (
    <div className={classes.UserProfile}>
      <h1>Welcome Back {props.user.name}</h1>
    <div className={classes.Wrapper}>
        <div className={classes.Box}>
          <div className={classes.Card}>
                <div className={classes.Container}>
                  <p className={classes.Headers}><b>Your Details</b>
                  <Button btnType="Edit" clicked={props.edit}>Edit</Button>
                  </p>
                  <p>{props.user.name}</p>
                  <p>{props.user.email} </p>
                  <p className={classes.Headers}>
                  <b>Address</b></p>
                  <p>{props.user.address}</p>
                </div>
           </div>
        </div>
     </div>
    </div>
  );
};
export default AdminComp;
