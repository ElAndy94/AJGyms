import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import DashBoard from '../../components/DashBoard/DashBoard';

class DashBoardBuilder extends Component {
  state = {

  }

  render() {
    return (
      <Aux>
        <DashBoard />
        <div>Classes</div>
      </Aux>
    );
  }
}

export default DashBoardBuilder;
