import React from "react";

import classes from './UserProfile.css';
import Button from '../UI/Button/Button';

const userProfile = (props) => {
  // props.user.address.map( line => <p>{line}</p> )
  // {/* <p>{props.user.address.map(i => <li>{i}</li>)}</p> */}
  return (
    <div className={classes.UserProfile}>
      <h1>Welcome Back, {props.user.user}</h1>
    <div className={classes.Wrapper}>
        <div className={classes.Box}>
          <div className={classes.Card}>
              <div className={classes.Container}>
                <p><b>Your Package</b></p>
                <p>Manchester {props.user.gymLocation}</p>
                <p>{props.user.payment}</p>
                <p>{props.user.contract}</p>
              </div>
          </div>
        </div>
        <div className={classes.Box}>
          <div className={classes.Card}>
                <div className={classes.Container}>
                  <p><b>Your Details</b><br/>{props.user.name}<br/>{props.user.email}</p>
                  <p><b>Address</b><br/>{props.user.address}<br/>M1 7DZ</p>
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
