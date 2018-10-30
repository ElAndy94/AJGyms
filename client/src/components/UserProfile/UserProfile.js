import React from "react";

import classes from './UserProfile.css';
import Button from '../UI/Button/Button';

const userProfile = (props) => {
  return (
    <div className={classes.UserProfile}>
      <h1>Welcome Back, Larry</h1>
    <div className={classes.Wrapper}>
        <div className={classes.Box}>
          <div className={classes.Card}>
              <div className={classes.Container}>
                <p><b>Your Package</b></p>
                <p>Manchester Market Street Gym</p>
                <p>Extra Multi-Access</p>
              </div>
          </div>
        </div>
        <div className={classes.Box}>
          <div className={classes.Card}>
                <div className={classes.Container}>
                  <p><b>Your Details</b><br/>Larry Ven Dyson</p>
                  <p><b>Personal Information</b><br/>40 Gringo Road<br/>M1 7DZ</p>
                  <p><b>Payment Information</b><br/>Direct Debit: Card ending 7070</p>
                  <Button btnType="Danger">Cancel Your Membership</Button>
                </div>
            </div>
        </div>
     </div>
    </div>
  );
};

export default userProfile;
