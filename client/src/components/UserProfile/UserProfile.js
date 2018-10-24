import React from "react";

import classes from './UserProfile.css';

const userProfile = (props) => {
  return (
    <div className={classes.UserProfile}>
      <h1>Welcome Back, Larry</h1>
    <div className={classes.Wrapper}>
        <div className={classes.Box}>
          <div className={classes.Card}>
              <div className={classes.Container}>
                <p>Your Package</p>
                <p>Manchester Market Street Gym</p>
                <p>Extra Multi-Access</p>
              </div>
          </div>
        </div>
        <div className={classes.Box}>
          <div className={classes.Card}>
                <div className={classes.Container}>
                  <p>Your Details</p>
                  <p>Personal Information</p>
                  <p>Payment Information</p>
                  <p>Cancel Your Membership</p>
                </div>
            </div>
        </div>
        {/* <div className={classes.Box}>C</div> */}
        {/* <div className={classes.Box}>D</div> */}
        {/* <div className={classes.Box}>E</div> */}
        {/* <div className={classes.Box}>F</div> */}
     </div>
    </div>
  );
};

export default userProfile;
