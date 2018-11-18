import React from "react";

import classes from './AdminComp.css';
import Button from '../UI/Button/Button';

const AdminComp = (props) => {
  return (
    <div className={classes.UserProfile}>
      <h1>Welcome Back {props.user.name}</h1>
    <div className={classes.Wrapper}>
        {/* <div className={classes.Box}>
          <div className={classes.Card}>
              <div className={classes.Container}>
                <p className={classes.Headers}><b>Your Package</b></p>
                <p>Manchester {props.user.gymLocation}</p>
                <p>{props.user.payment}</p>
                <p>{props.user.contract}</p>
              </div>
          </div>
        </div> */}
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
                  {/* <p className={classes.Headers}><b>Payment Information</b></p>
                  <p>Direct Debit: Card ending 7070</p>
                  <Button btnType="Danger">Cancel Your Membership</Button> */}
                </div>
           </div>
        </div>
     </div>
    </div>
  );
};
export default AdminComp;
