import React, { Component } from 'react';

import Aux from '../../hoc/ReactAux';
import UserProfile from '../../components/UserProfile/UserProfile';
import Footer from '../../components/Footer/Footer';

class Profile extends Component {
  state = {

  }

  render() {
    return (
      <Aux>
        <UserProfile />
        <Footer />
      </Aux>
    );
  }
}

export default Profile;
