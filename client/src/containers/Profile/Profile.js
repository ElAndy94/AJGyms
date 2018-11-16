import React, { Component } from 'react';
import axios from 'axios';

import UserProfile from '../../components/UserProfile/UserProfile';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/ReactAux';
import classes from './Profile.css';
import { updateObject, checkValidity } from '../../shared/utility';

class Profile extends Component {
  state = {
    user: {},
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: 'Your New Email',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Address'
        },
        value: 'Your New Address',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
    },
    showForm: false,
  }

  componentDidMount () {
    axios.get('/api/auth/' + this.props.userId )
      .then( response => {
          this.setState({ user: response.data });
          // console.log(response.data);
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
    //   console.log(this.state.user.address);
    //   console.log(this.state.user.gymLocation);
    //   console.log(this.state.user.email);
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.onSubmitData(this.state.controls.email.value, this.state.controls.address.value);
  }

  handleChange = () => {
  this.setState({ showForm: true });

  let inputEmail = this.state.user.email;
  let statusCopy = Object.assign({}, this.state.controls);
    statusCopy.email.value = inputEmail;
    this.setState(statusCopy);

  let inputAddress = this.state.user.address;
  let statusCopyTwo = Object.assign({}, this.state.controls);
    statusCopyTwo.address.value = inputAddress;
    this.setState(statusCopyTwo);
  }

  onSubmitData = () => {
    const userUpdate = {
      userEmail: this.state.controls.email.value,
      userAddress: this.state.controls.address.value,
      userId: this.props.userId
    }
    axios.post('/api/auth/infoUpdate', userUpdate)
      .then(response => {
        this.setState({ showForm: false });
        console.log(response);
      }).catch(error => {
        console.log(error);
      });
  }


  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        invalid={!formElement.config.valid}
        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
    ));

    return (
      <Aux>
         <div className={classes.BackGround}>
            <UserProfile user={this.state.user} edit={this.handleChange} />
            <form onSubmit={this.submitHandler} className={classes.ProfileForm} style={{display: this.state.showForm ? 'block' : 'none' }}>
              {form}
              <Button btnType="Success">SUBMIT</Button>
            </form>
         </div>
      </Aux>
    );
  }
}

export default Profile;
