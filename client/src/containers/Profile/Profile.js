import React, { Component } from 'react';
import axios from 'axios';

import UserProfile from '../../components/UserProfile/UserProfile';
import Aux from '../../hoc/ReactAux';
import { updateObject, checkValidity } from '../../shared/utility';
import classes from './Profile.css';

class Profile extends Component {
  state = {
    user: {}
  }

  componentDidMount () {
    axios.get('/api/auth/' + this.props.userId )
      .then( response => {
          this.setState({ user: response.data });
          // console.log(this.state.user);
      });
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    });
    this.setState({controls: updatedControls});
  }

  submitHandler = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <Aux>
         <div className={classes.BackGround}>
            <UserProfile user={this.state.user}/>
         </div>
      </Aux>
    );
  }
}

export default Profile;
