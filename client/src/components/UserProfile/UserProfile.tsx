import React from 'react';

import './UserProfile.scss';
import Button from '../UI/Button/Button';

const userProfile = props => {
  return (
    <div className='User__Profile'>
      <div className='User__Profile__Wrapper'>
        <div className='Card'>
          <h1>Welcome Back {props.user.name}</h1>
          <p className='Card__Headers'>
            <p>Your Package</p>
          </p>
          <p>Manchester {props.user.gymLocation}</p>
          <p>{props.user.payment}</p>
          <p>{props.user.contract}</p>
          <p className='Card__Headers'>
            <p>Your Details</p>
            <Button btnType='Edit' clicked={props.edit}>
              Edit
            </Button>
          </p>
          <p>{props.user.name}</p>
          <p>{props.user.email} </p>
          <p className='Card__Headers'>
            <p>Address</p>
          </p>
          <p>{props.user.address}</p>
          <p className='Card__Headers'>
            <p>Payment Information</p>
          </p>
          <p>Direct Debit: Card ending 7070</p>
          <Button btnType='Danger'>Cancel Your Membership</Button>
        </div>
      </div>
    </div>
  );
};

export default userProfile;
