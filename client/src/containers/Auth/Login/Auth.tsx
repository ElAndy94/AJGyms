import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import './Auth.scss';
import { updateObject, checkValidity } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';

interface Props {
  onAuth: (x: string, y: string) => void;
  error: [];
}

class Auth extends Component<Props> {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: 'test@test.com',
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
        value: 'Test123',
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
  };

  handleShowPass = () => {
    let x = document.getElementById('myPass');
    //@ts-ignore
    if (x.type === 'password') {
      //@ts-ignore
      x.type = 'text';
    } else {
      //@ts-ignore
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
      //@ts-ignore
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <React.Fragment>
        <div className='background__auth'>
          <div className='auth__form'>
            {errorMessage}
            <h2>LOGIN</h2>
            <form className='auth__form--style' onSubmit={this.submitHandler}>
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
              <Button btnType='success'>SUBMIT</Button>
            </form>
          </div>
        </div>
      </React.Fragment>
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
