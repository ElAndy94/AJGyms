import React, { Component } from 'react';
import axios from 'axios';

import Aux from '../../hoc/ReactAux';
import classes from './Admin.css';
// import AdminComp from '../../components/AdminComp/AdminComp';
import User from '../../components/User/User';

class Admin extends Component {
  state = {
    user: {},
    users: [],
    filteredUsers: []
  }

  componentDidMount () {
    axios.get('/api/auth/' + this.props.userId )
      .then( response => {
          this.setState({ user: response.data });
      });

    axios.get('/api/auth/')
      .then( response => {
        const users = response.data;
        const updatedUsers = users.map(user => {
          return {
            ...user,
          }
        });
        this.setState({ users: updatedUsers, filteredUsers: updatedUsers });
      })
      .catch(error => {
        console.log(error);
      });
  }

  userSelectedHandler = (id) => {
    this.setState({selectedUserId: id});
  }

  render() {
    const users = this.state.filteredUsers.map(user => {
      return  (
      <User
        key={user._id}
        name={user.name}
        email={user.email}
        address={user.address}
        contract={user.contract}
        date={user.date}
        payment={user.payment}
        goal={user.goal}
        gymLocation={user.gymLocation}
        pt={user.pt}
        clicked={() => this.userSelectedHandler(user._id)}/>
      );
    });

    return (
      <Aux>
        <div className={classes.BackGround}>
          {/* <AdminComp user={this.state.user} /> */}
          <h1 className={classes.FancyFont}> Users </h1>
          <div className={classes.Users}>
            {users}
          </div>
        </div>
      </Aux>
    );
  }
}

export default Admin;
