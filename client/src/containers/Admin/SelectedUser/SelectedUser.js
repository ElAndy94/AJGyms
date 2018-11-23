import React, { Component } from 'react';
import axios from 'axios';

import classes from './SelectedUser.css';
import Button from '../../../components/UI/Button/Button';

class SelectedUser extends Component {
  state = {
      loadedUser: null
  }

  componentDidUpdate () {
    if ( this.props.id ) {
      if ( !this.state.loadedUser || (this.state.loadedUser && this.state.loadedUser._id !== this.props.id) ) {
        axios.get( '/api/auth/' + this.props.id )
          .then( response => {
            this.setState( { loadedUser: response.data } );
          });
      }
    }
  }

  editUserHandler = () => {

  }

  deleteUserHandler = () => {
    // axios.delete('/api/classes/' + this.props.id)
    //   .then(response => {
    //     console.log(response);
    //     this.props.onDelete(this.props.id);
    //     this.setState({loadedUser: null});
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  render () {
      let user = <p style={{ textAlign: 'center', color: 'white', fontSize: '20px',  marginTop: '5px'}}>Please select a User!</p>;
      if ( this.props.id ) {
        user = <p style={{ textAlign: 'center' }}>Loading...!</p>;
      }
      if ( this.state.loadedUser ) {
        user = (
          <div className={classes.BackGround}>
            <div className={classes.SelectedUser}>
              <h1>{this.state.loadedUser.name}</h1>
              <p>{this.state.loadedUser.email}</p>
              <p>{this.state.loadedUser.address}</p>
              <p>{this.state.loadedUser.gymLocation}</p>
              <p>{this.state.loadedUser.pt}</p>
              <div className={classes.Edit}>
                {
                  this.props.isAdmin ?
                  <div>
                    <Button btnType="Success" clicked={this.editUserHandler}>Edit User</Button>
                    <Button btnType="Danger" clicked={this.deleteUserHandler}>Delete User</Button>
                  </div>
                  :
                  <div> </div>
                }
              </div>
            </div>
          </div>
        );
      }
      return user;
  }
}

export default SelectedUser;
