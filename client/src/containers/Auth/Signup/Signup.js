import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Aux from '../../../hoc/ReactAux';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './Signup.css';
import { updateObject, checkValidity } from '../../../shared/utility';

class Signup extends Component {
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
            minLength: 6,
            maxLength: 25
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
            isEmail: true,
            maxLength: 40
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
            minLength: 6,
            maxLength: 25
          },
          valid: false,
          touched: false
        },
        password2: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password'
          },
          value: '',
          validation: {
            required: true,
            minLength: 6,
            maxLength: 25
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
            minLength: 6,
            maxLength: 50
          },
          valid: false,
          touched: false
        },
        gymLocation: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'Market Street', displayValue: 'Market Street'},
              {value: 'Portland Street', displayValue: 'Portland Street'},
              {value: 'Oxford Road', displayValue: 'Oxford Road'},
            ]
          },
          value: 'Market Street',
          validation: {},
          valid: true
        },
        membershipType: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: '12 Month Contract', displayValue: '12 Month Contract £16.00'},
              {value: '6 Month Contract', displayValue: '6 Month Contract £18.00'},
              {value: 'Rolling Monthly Contract', displayValue: 'Rolling Monthly Contract £22.00'},
            ]
          },
          value: '12 Month Contract',
          validation: {},
          valid: true
        },
        payment: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'Monthly Payments', displayValue: 'Monthly Payments'},
              {value: 'Upfront Payment', displayValue: 'Up Front Payment *25% OFF*'},
            ]
          },
          value: 'Monthly Payments',
          validation: {},
          valid: true
        },
        gymGoal: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'Weight Loss', displayValue: 'Weight Loss'},
              {value: 'Muscle Gain', displayValue: 'Muscle Gain'},
              {value: 'Strength Gain', displayValue: 'Strength Gain'},
              {value: 'Cardio', displayValue: 'Cardio'},
              {value: 'Rather Not Share', displayValue: 'Rather Not Share'},
            ]
          },
          value: 'Weight Loss',
          validation: {},
          valid: true
        },
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
    if (
      this.state.controls.password.value ===
      this.state.controls.password2.value &&
      this.state.controls.password.valid &&
      this.state.controls.email.valid &&
      this.state.controls.name.valid &&
      this.state.controls.address.valid === true
      ){
      this.onAuth(
        this.state.controls.name.value,
        this.state.controls.email.value,
        this.state.controls.password.value,
        this.state.controls.address.value,
        this.state.controls.membershipType.value,
        this.state.controls.payment.value,
        this.state.controls.gymGoal.value,
        this.state.controls.gymLocation.value
      );
    }
      // this.errorMessage = <p>Passwords Need To Match</p>;
  }

  onAuth = () => {
      const authentication = {
        name: this.state.controls.name.value,
        email: this.state.controls.email.value,
        password: this.state.controls.password.value,
        address: this.state.controls.address.value,
        contract: this.state.controls.membershipType.value,
        payment: this.state.controls.payment.value,
        goal: this.state.controls.gymGoal.value,
        gymLocation: this.state.controls.gymLocation.value,
        date: new Date(),
      };
      axios.post('/api/auth', authentication)
        .then(response => {
          this.setState({ isSignup: false })
          console.log(response);
        }).catch(error => {
          console.log(error);
        });
  }

  render () {
    if (this.state.isSignup === false) {
      return <Redirect to="/auth" />
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
        <div className={classes.BackGround}>
          <div className={classes.Signup}>
            {errorMessage}
            <h2>SIGN UP</h2>
            <form className={classes.BT} onSubmit={this.submitHandler}>
                {form}
            <Button btnType="Success">SUBMIT</Button>
            </form>
          </div>
        </div>
      </Aux>
    );
  }
}

export default Signup;
