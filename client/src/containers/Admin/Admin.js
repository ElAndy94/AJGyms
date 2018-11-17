import React, { Component } from 'react';

import Aux from '../../hoc/ReactAux';
import classes from './Admin.css';
import AdminComp from '../../components/AdminComp/AdminComp';

class Admin extends Component {
  state = {

  }

  render() {
    return (
      <Aux>
      <AdminComp />
      </Aux>
    );
  }
}

export default Admin;
