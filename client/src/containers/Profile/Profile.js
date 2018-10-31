import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';

import UserProfile from '../../components/UserProfile/UserProfile';
import Aux from '../../hoc/ReactAux';
import Footer from '../../components/Footer/Footer';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Profile.css';
import { updateObject, checkValidity } from '../../shared/utility';

class Profile extends Component {
  state = {
    formIsValid: false,
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
    // this.membershipSub(this.state.controls.membershipType.value, this.state.controls.payment.value, this.state.controls.gymGoal.value);
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

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    };

    return (
      <Aux>
        <UserProfile user={this.state.user}/>
        <div className={classes.Profile}>
        {errorMessage}
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

export default Profile;
