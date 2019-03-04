import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from '../../../hoc/ReactAux';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import './Auth.scss';
import { updateObject, checkValidity } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';

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
          placeholder: 'Password',
          id: 'myPass'
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
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
    // this.props.onAuthComplete();
    // this.onAuth(this.state.controls.email.value, this.state.controls.password.value);
  };

  handleShowPass = () => {
    let x = document.getElementById('myPass');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  };

  render() {
    if (this.state.signedIn === true) {
      return <Redirect to='/' />;
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
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <Aux>
        <div className='BackGround'>
          <div className='Auth'>
            {errorMessage}
            <h2>LOGIN</h2>
            <form className='BT' onSubmit={this.submitHandler}>
              {form}
              <label>
                {' '}
                Show Password: &nbsp;
                <input
                  name='image'
                  type='checkbox'
                  onClick={this.handleShowPass}
                />
              </label>
              <br />
              <Button btnType='Success'>SUBMIT</Button>
            </form>
          </div>
        </div>
      </Aux>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//       loading: state.auth.loading,
//       error: state.auth.error,
//       isAuthenticated: state.auth.userId !== null,
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Auth);
