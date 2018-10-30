import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Aux from '../../../hoc/ReactAux';
import Footer from '../../../components/Footer/Footer';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './Auth.css';
import { updateObject, checkValidity } from '../../../shared/utility';

class Auth extends Component {
    state = {
      controls: {
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Email'
          },
          value: '',
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password'
          },
          value: '',
          validation: {
            required: true,
            minLength: 6
          },
          valid: false,
          touched: false
        }
      },
      signedIn: false
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
    this.onAuth(this.state.controls.email.value, this.state.controls.password.value);
  }

  // switchAuthModeHandler = () => {
  //   this.setState(prevState => {
  //     return {isSignup: !prevState.isSignup};
  //   });
  // };

  onAuth = () => {
      const authenticationCheck = {
        email: this.state.controls.email.value,
        password: this.state.controls.password.value,
      };
      axios.post('/api/auth/check', authenticationCheck)
        .then(response => {
          this.props.onAuthComplete();
          console.log(response);
        }).catch(error => {
          console.log(error);
        });
    }

  render () {
    if (this.state.signedIn === true) {
     return <Redirect to="/" />
    }

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

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    };

    return (
      <Aux>
        <div className={classes.Auth}>
            {/* This redirects you when you successfully log on, should be done differently tbh!  */}
            {/* {this.state.isAuthenticated ? <Redirect to="/"/> : null } */}
              {errorMessage}
              <h2>SIGN IN</h2>
              <form onSubmit={this.submitHandler}>
                  {form}
                  <Button btnType="Success">SUBMIT</Button>
              </form>
              {/* <Button */}
                  {/* clicked={this.switchAuthModeHandler} */}
                  {/* btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button> */}
          </div>
          <Footer />
      </Aux>
    );
  }
}

export default Auth;
