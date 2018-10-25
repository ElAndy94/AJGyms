import React, { Component } from 'react';

import Aux from '../../hoc/ReactAux';
import UserProfile from '../../components/UserProfile/UserProfile';

class Profile extends Component {
  state = {

  }

  render() {
    return (
      <Aux>
        <UserProfile />
      </Aux>
    );
  }
}

export default Profile;
