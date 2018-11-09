import React, { Component } from 'react';

import Aux from '../../hoc/ReactAux';
import DashBoard from '../../components/DashBoard/DashBoard';
import classes from './DashBoard.css';

class DashBoardBuilder extends Component {
  state = {

  }

  render() {
    return (
      <Aux>
        <DashBoard className={classes.Dash}/>
      </Aux>
    );
  }
}

export default DashBoardBuilder;
