import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Portal from '../../components/Portal/Portal';

class PortalBuilder extends Component {
  state = {

  }

  render() {
    return (
      <Aux>
        <Portal />
        <div>Classes</div>
      </Aux>
    );
  }
}

export default PortalBuilder;
