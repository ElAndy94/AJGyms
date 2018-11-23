import React, { Component } from 'react';
import axios from 'axios';

import Aux from '../../hoc/ReactAux';
import classes from './Admin.css';
import User from '../../components/User/User';
import SelectedUser from './SelectedUser/SelectedUser';
// import Button from '../../components/UI/Button/Button';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    user: {},
    users: [],
    filteredUsers: [],
    }
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
          <h1 className={classes.FancyFont}> Users </h1>
          <div className={classes.Users}>
            {users}
          </div>
          <SelectedUser userId={this.props.userId} isAdmin={this.props.isAdmin} id={this.state.selectedUserId} onDelete={this.handleDelete} />
        </div>
      </Aux>
    );
  }
}

export default Admin;
