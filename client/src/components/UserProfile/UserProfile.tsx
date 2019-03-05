import React from 'react';

import './UserProfile.scss';
import Button from '../UI/Button/Button';

const userProfile = props => {
  return (
    <div className='UserProfile'>
      <h1>Welcome Back {props.user.name}</h1>
      <div className='Wrapper'>
        <div className='Box'>
          <div className='Card'>
            <div className='Container'>
              <p className='Headers'>
                <b>Your Package</b>
              </p>
              <p>Manchester {props.user.gymLocation}</p>
              <p>{props.user.payment}</p>
              <p>{props.user.contract}</p>
            </div>
          </div>
        </div>
        <div className='Box'>
          <div className='Card'>
            <div className='Container'>
              <p className='Headers'>
                <b>Your Details</b>
                <Button btnType='Edit' clicked={props.edit}>
                  Edit
                </Button>
              </p>
              <p>{props.user.name}</p>
              <p>{props.user.email} </p>
              <p className='Headers'>
                <b>Address</b>
              </p>
              <p>{props.user.address}</p>
              <p className='Headers'>
                <b>Payment Information</b>
              </p>
              <p>Direct Debit: Card ending 7070</p>
              <Button btnType='Danger'>Cancel Your Membership</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default userProfile;
