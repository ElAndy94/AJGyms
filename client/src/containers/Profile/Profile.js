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
        value: 'melissaastbury@hotmail.com',
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
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
    },
    showFormEmail: false,
    showFormAddress: false
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
    this.onSubmitData(this.state.controls.email.value);
  }

  handleAddressChange = () => {
    this.setState({ showFormAddress: true });
  }

  handleEmailChange = () => {
    this.setState({ showFormEmail: true });
  }

  onSubmitData = () => {
    const userUpdate = {
      userEmail: this.state.controls.email.value,
      userId: this.props.userId
    }
    axios.post('/api/auth/', userUpdate)
      .then(response => {
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
            <UserProfile user={this.state.user} editAddress={this.handleAddressChange} editEmail={this.handleEmailChange}/>
            <form onSubmit={this.submitHandler} className={classes.ProfileForm} style={{display: this.state.showFormEmail ? 'block' : 'none' }}>
              {form}
              <Button btnType="Success">SUBMIT</Button>
            </form>
            <form onSubmit={this.submitHandler} className={classes.ProfileForm} style={{display: this.state.showFormAddress ? 'block' : 'none' }}>
              {form}
              <Button btnType="Success">SUBMIT</Button>
            </form>
         </div>
      </Aux>
    );
  }
}

export default Profile;
