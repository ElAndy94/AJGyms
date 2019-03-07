import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import UserProfile from '../../components/UserProfile/UserProfile';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import './Profile.scss';
import { updateObject, checkValidity } from '../../shared/utility';

interface Props {
  userId: string;
}

class Profile extends Component<Props> {
  state: any = {
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
          required: true
        },
        valid: false,
        touched: false
      }
    },
    showProfile: true
  };

  componentDidMount() {
    if (this.props.userId === undefined) {
      return;
    }
    axios.get('/api/auth/' + this.props.userId).then(response => {
      this.setState({ user: response.data });
    });
  }

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
    this.onSubmitData();
  };

  handleChange = () => {
    this.setState({ showProfile: false });

    let inputEmail = this.state.user.email;
    let statusCopy = Object.assign({}, this.state.controls);
    statusCopy.email.value = inputEmail;
    this.setState(statusCopy);

    let inputAddress = this.state.user.address;
    let statusCopyTwo = Object.assign({}, this.state.controls);
    statusCopyTwo.address.value = inputAddress;
    this.setState(statusCopyTwo);
  };

  onSubmitData = () => {
    const userUpdate = {
      userEmail: this.state.controls.email.value,
      userAddress: this.state.controls.address.value,
      userId: this.props.userId
    };
    axios
      .post('/api/auth/infoUpdate', userUpdate)
      .then(response => {
        this.setState({ showProfile: true });
        this.refresh();
      })
      .catch(error => {
        console.log(error);
      });
  };

  cancelEdit = () => {
    this.setState({ showProfile: true });
  };

  refresh = () => {
    axios.get('/api/auth/' + this.props.userId).then(response => {
      this.setState({ user: response.data });
    });
  };

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
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    return (
      <React.Fragment>
        <div className='Profile__BackGround'>
          {this.state.showProfile ? (
            <UserProfile
              user={this.state.user}
              handleChange={this.handleChange}
            />
          ) : (
            <form onSubmit={this.submitHandler} className='Profile__Form'>
              {form}
              <Button btnType='Success'>SUBMIT</Button>
              <Button btnType='Danger' clicked={this.cancelEdit}>
                CANCEL
              </Button>
            </form>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  userId: state.auth.userId
});

export default connect(
  mapStateToProps,
  null
)(Profile);
