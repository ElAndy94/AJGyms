import React from 'react';

import './UserProfile.scss';
import User from './User/User';

const userProfile = props => {
  return (
    <div key={props.user.id} className='user__profile'>
      <div className='user__profile__wrapper'>
        <div className='card'>
          <User user={props.user} edit={props.handleChange} />
        </div>
      </div>
    </div>
  );
};

export default userProfile;
