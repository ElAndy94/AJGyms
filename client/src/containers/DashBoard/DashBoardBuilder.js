import React, { Component } from 'react';

import Aux from '../../hoc/ReactAux';
import DashBoard from '../../components/DashBoard/DashBoard';
import Footer from '../../components/Footer/Footer';

class DashBoardBuilder extends Component {
  state = {

  }

  render() {
    return (
      <Aux>
        <DashBoard />
        <Footer />
      </Aux>
    );
  }
}

export default DashBoardBuilder;
