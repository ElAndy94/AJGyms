import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect} from 'react-router-dom';

import Aux from '../../../hoc/ReactAux';
import Footer from '../../../components/Footer/Footer';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './Signup.css';
import { updateObject, checkValidity } from '../../../shared/utility';

class Auth extends Component {
    state = {
      controls: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Name'
          },
          value: '',
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false
        },
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
      isSignup: true
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
    this.onAuth(this.state.controls.name.value, this.state.controls.email.value, this.state.controls.password.value);
  }

  onAuth = () => {
    if (this.state.isSignup) {
      const authentication = {
        name: this.state.controls.name.value,
        email: this.state.controls.email.value,
        password: this.state.controls.password.value,
        date: new Date(),
      };
      axios.post('/api/auth', authentication)
        .then(response => {
          console.log(response);
        }).catch(error => {
          console.log(error);
        });
    }
  }

  render () {
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
        <div className={classes.Signup}>
            {/* This redirects you when you successfully log on, should be done differently tbh!  */}
            {/* {this.state.isAuthenticated ? <Redirect to="/"/> : null } */}
              {errorMessage}
              <h2>SIGN UP</h2>
              <form onSubmit={this.submitHandler}>
                  {form}
                  <Button btnType="Success">SUBMIT</Button>
              </form>
          </div>
          <Footer />
      </Aux>
    );
  }
}

export default Auth;