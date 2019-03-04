import React, { Component } from 'react';

import './CreateGymClass.scss';
import axios from 'axios';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../shared/utility';
import Button from '../../components/UI/Button/Button';
import { Redirect } from 'react-router-dom';

class CreateGymClass extends Component {
  state = {
    createClassForm: {
      gymLocation: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'Market Street', displayValue: 'Market Street' },
            { value: 'Portland Street', displayValue: 'Portland Street' },
            { value: 'Oxford Road', displayValue: 'Oxford Road' }
          ]
        },
        value: 'Market Street',
        validation: {},
        valid: true
      },
      classType: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'Induction Only', displayValue: 'Induction Only' },
            { value: 'Classes Only', displayValue: 'Classes Only' },
            {
              value: 'Digital Classes Only',
              displayValue: 'Digital Classes Only'
            }
          ]
        },
        value: 'Classes Only',
        validation: {},
        valid: true
      },
      className: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Class Name (Strength Training)'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      timeOfDay: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'Morning (06:00 - 07:00)',
              displayValue: 'Morning (06:00 - 07:00)'
            },
            {
              value: 'Morning (07:00 - 08:00)',
              displayValue: 'Morning (07:00 - 08:00)'
            },
            {
              value: 'Morning (08:00 - 09:00)',
              displayValue: 'Morning (08:00 - 09:00)'
            },
            {
              value: 'Morning (09:00 - 10:00)',
              displayValue: 'Morning (09:00 - 10:00)'
            },
            {
              value: 'Morning (10:00 - 11:00)',
              displayValue: 'Morning (10:00 - 11:00)'
            },
            {
              value: 'Morning (11:00 - 12:00)',
              displayValue: 'Morning (11:00 - 12:00)'
            },
            {
              value: 'Afternoon (12:00 - 13:00)',
              displayValue: 'Afternoon (12:00 - 13:00)'
            },
            {
              value: 'Afternoon (13:00 - 14:00)',
              displayValue: 'Afternoon (13:00 - 14:00)'
            },
            {
              value: 'Afternoon (14:00 - 15:00)',
              displayValue: 'Afternoon (14:00 - 15:00)'
            },
            {
              value: 'Afternoon (15:00 - 16:00)',
              displayValue: 'Afternoon (15:00 - 16:00)'
            },
            {
              value: 'Afternoon (16:00 - 17:00)',
              displayValue: 'Afternoon (16:00 - 17:00)'
            },
            {
              value: 'Evening (17:00 - 18:00)',
              displayValue: 'Evening (17:00 - 18:00)'
            },
            {
              value: 'Evening (18:00 - 19:00)',
              displayValue: 'Evening (18:00 - 19:00)'
            },
            {
              value: 'Evening (19:00 - 20:00)',
              displayValue: 'Evening (19:00 - 20:00)'
            },
            {
              value: 'Evening (20:00 - 21:00)',
              displayValue: 'Evening (20:00 - 21:00)'
            },
            {
              value: 'Noon (21:00 - 22:00)',
              displayValue: 'Noon (21:00 - 22:00)'
            }
          ]
        },
        value: 'Morning (06:00 - 07:00)',
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
    showConfirmation: false,
    currentClass: {},
    classCreated: false
  };

  createClassHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.createClassForm) {
      formData[formElementIdentifier] = this.state.createClassForm[
        formElementIdentifier
      ].value;
    }
    const newGymClass = {
      data: formData
      // userId: this.props.userId
    };
    // Setting the state to store the class data in the state, and toggle the showConfirmation flag.
    this.setState({ currentClass: newGymClass.data, showConfirmation: true });
    this.createGymClassHandler(formData);
  };

  cancelNewClass = () => {
    this.setState({ showConfirmation: false, formData: {}, className: {} });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.createClassForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.createClassForm[inputIdentifier].validation
        ),
        touched: true
      }
    );
    const updatedCreateClassForm = updateObject(this.state.createClassForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedCreateClassForm) {
      formIsValid =
        updatedCreateClassForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      createClassForm: updatedCreateClassForm,
      formIsValid: formIsValid
    });
  };

  createGymClassHandler = formData => {
    const newClass = {
      location: formData.gymLocation,
      type: formData.classType,
      name: formData.className,
      time: formData.timeOfDay,
      ptName: this.props.userName
    };
    axios
      .post('/api/classes', newClass)
      .then(response => {
        this.setState({ classCreated: true });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    if (this.state.classCreated === true) {
      return <Redirect to='/classes' />;
    }

    const formElementsArray = [];
    for (let key in this.state.createClassForm) {
      formElementsArray.push({
        id: key,
        config: this.state.createClassForm[key]
      });
    }
    let form = (
      <form onSubmit={this.createClassHandler}>
        {formElementsArray.map(formElement => (
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
        ))}
        <Button
          btnType='Success'
          onClick={this.createGymClassHandler}
          disabled={!this.state.formIsValid}
        >
          Add Class
        </Button>
      </form>
    );

    // Delcaring the confirmation but leaving it null - this is so after the inital page render
    //  nothing is shown in the screen. If statement is used to return the ClassConfirmation if
    //  showConfirmation flag is true - An else statement could be used here for a default value.
    let confirmation;
    if (this.state.showConfirmation) {
      confirmation = <ClassConfirmation class={this.state.currentClass} />;
    }

    /*
      I've added the confimration below - the styling is applied here, but I think
      it would be better practice to style inside the ClassConfirmation component.
      Another thing would be to look into a react equivalent of ng-container to
      replace the div that holds confirmation - this div only adds to the web of
      nested divs.
    */
    return (
      <div className='BackGround'>
        <div className='CreateGymClass'>
          <h3>
            {this.props.userName}
            <br /> Make sure all fields are correct before creating a class!
          </h3>
          {form}
        </div>
        <div className='CentreDiv'>{confirmation}</div>
      </div>
    );
  }
}

/*
  Component to hold the structure of a class confirmation.
  If the props are for some reason empty - the default value will be returned.
*/
function ClassConfirmation(props) {
  if (!props) {
    return <p>No class found!</p>;
  }

  return (
    <div className='BackGround'>
      <div>
        <p>{props.class.gymLocation}</p>
        <p>{props.class.classType}</p>
        <p>{props.class.className}</p>
        <p>{props.class.timeOfDay}</p>
      </div>
    </div>
  );
}

export default CreateGymClass;
