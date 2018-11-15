import React from "react";

import classes from './UserProfile.css';
import Button from '../UI/Button/Button';
// import Modal from '../UI/Modal/Modal';

const userProfile = (props) => {
  return (
    <div className={classes.UserProfile}>
      <h1>Welcome Back {props.user.name}</h1>
    <div className={classes.Wrapper}>
        <div className={classes.Box}>
          <div className={classes.Card}>
              <div className={classes.Container}>
                <p className={classes.Headers}><b>Your Package</b></p>
                <p>Manchester {props.user.gymLocation}</p>
                <p>{props.user.payment}</p>
                <p>{props.user.contract}</p>
              </div>
          </div>
        </div>
        <div className={classes.Box}>
          <div className={classes.Card}>
                <div className={classes.Container}>
                  <p className={classes.Headers}><b>Your Details</b></p>
                  <p>{props.user.name}<br/>{props.user.email} <Button btnType="Edit" clicked={props.editEmail}>Edit</Button></p>
                  <p className={classes.Headers}><b>Address</b></p>
                  <p>{props.user.address}<br/>M1 7DZ <Button btnType="Edit" clicked={props.editAddress}>Edit</Button> </p>
                  <p className={classes.Headers}><b>Payment Information</b></p>
                  <p>Direct Debit: Card ending 7070</p>
                  <Button btnType="Danger">Cancel Your Membership</Button>
                </div>
           </div>
        </div>
     </div>
    </div>
  );
};

export default userProfile;
