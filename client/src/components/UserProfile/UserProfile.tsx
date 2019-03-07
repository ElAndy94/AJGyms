import React from 'react';

import './UserProfile.scss';
import User from './User/User';

const userProfile = props => {
  const propsclicked = () => {
    console.log('this got clicked');
  };
  return (
    <div key={props.user.id} className='User__Profile'>
      <div className='User__Profile__Wrapper'>
        <div className='Card'>
          <User user={props.user} edit={props.handleChange} />
        </div>
      </div>
    </div>
  );
};

export default userProfile;
