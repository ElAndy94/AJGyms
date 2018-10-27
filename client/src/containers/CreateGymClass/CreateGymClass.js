import React, { Component } from 'react'

import classes from './CreateGymClass.css';
import axios from 'axios';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../shared/utility';
import Button from '../../components/UI/Button/Button';
// import Modal from '../../components/UI/Modal/Modal';

class CreateGymClass extends Component {
  state = {
    createClassForm: {
      gymLocation: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'MarketStreet', displayValue: 'Market Street'},
            {value: 'PortlandStreet', displayValue: 'Portland Street'},
            {value: 'OxfordRoad', displayValue: 'Oxford Road'},
          ]
        },
        value: 'MarketStreet',
        validation: {},
        valid: true
      },
      classType: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'AllClasses', displayValue: 'All Classes'},
            {value: 'InductionOnly', displayValue: 'Induction Only'},
            {value: 'Classes Only', displayValue: 'Classes Only'},
            {value: 'DigitalClassesOnly', displayValue: 'Digital Classes Only'},
          ]
        },
        value: 'AllClasses',
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
            {value: '08:00', displayValue: '08:00'},
            {value: '08:30', displayValue: '08:30'},
            {value: '09:00', displayValue: '09:00'},
            {value: '09:30', displayValue: '09:30'},
            {value: '10:00', displayValue: '10:00'},
            {value: '10:30', displayValue: '10:30'},
            {value: '11:00', displayValue: '11:00'},
            {value: '11:30', displayValue: '11:30'},
            {value: '12:00', displayValue: '12:00'},
            {value: '12:30', displayValue: '12:30'},
            {value: '13:00', displayValue: '13:00'},
            {value: '13:30', displayValue: '13:30'},
            {value: '14:00', displayValue: '14:00'},
            {value: '14:30', displayValue: '14:30'},
            {value: '15:00', displayValue: '15:00'},
            {value: '15:30', displayValue: '15:30'},
            {value: '16:00', displayValue: '16:00'},
            {value: '16:30', displayValue: '16:30'},
            {value: '17:00', displayValue: '17:00'},
            {value: '17:30', displayValue: '17:30'},
            {value: '18:00', displayValue: '18:00'},
            {value: '18:30', displayValue: '18:30'},
            {value: '19:00', displayValue: '19:00'},
            {value: '19:30', displayValue: '19:30'},
            {value: '20:00', displayValue: '20:00'},
            {value: '20:30', displayValue: '20:30'},
          ]
        },
        value: '08:00',
        validation: {},
        valid: true
      },
    },
    formIsValid: false,
    showConfirmation: false,
    currentClass: {},
  }

  createClassHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.createClassForm) {
      formData[formElementIdentifier] = this.state.createClassForm[formElementIdentifier].value;
    }
    const newGymClass = {
      data: formData,
      // userId: this.props.userId
    }
    // Setting the state to store the class data in the state, and toggle the showConfirmation flag.
    this.setState({currentClass: newGymClass.data, showConfirmation: true});
    this.createGymClassHandler(formData);
  }

  cancelNewClass = () => {
    this.setState({showConfirmation: false, formData: {}, className: {} });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(this.state.createClassForm[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.createClassForm[inputIdentifier].validation),
        touched: true
    });
    const updatedCreateClassForm = updateObject(this.state.createClassForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedCreateClassForm) {
      formIsValid = updatedCreateClassForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({createClassForm: updatedCreateClassForm, formIsValid: formIsValid});
  }

  createGymClassHandler = (formData) => {
    const newClass = {
      location: formData.gymLocation,
      type: formData.classType,
      name: formData.className,
      time: formData.timeOfDay
    };
    axios.post('/api/classes', newClass)
      .then(response => {
        console.log(response);
        // this.cancelNewClass();
      }).catch(error => {
        console.log(error);
      });
  }

  render() {
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
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
          ))}
          <Button
            btnType="Success"
            onClick={this.createGymClassHandler}
            disabled={!this.state.formIsValid}
          >Add Class</Button>
        </form>
    );

    // Delcaring the confirmation but leaving it null - this is so after the inital page render
    //  nothing is shown in the screen. If statement is used to return the ClassConfirmation if
    //  showConfirmation flag is true - An else statement could be used here for a default value.
    let confirmation;
    if (this.state.showConfirmation) {
      confirmation = (
        <ClassConfirmation
          class={this.state.currentClass}
        />
      );
    }

    /*
      I've added the confimration below - the styling is applied here, but I think
      it would be better practice to style inside the ClassConfirmation component.
      Another thing would be to look into a react equivalent of ng-container to
      replace the div that holds confirmation - this div only adds to the web of
      nested divs.
    */
    return (
      <div>
        <div className={classes.CreateGymClass}>
          <h3>Larry, <br/> Make sure all fields are correct before creating a class!</h3>
          {form}
        </div>
        <div className={classes.CentreDiv}>
            {confirmation}
            {/* <Button btnType="Success" onClick={this.createGymClassHandler}>Create Class</Button> */}
            {/* <button onClick={this.createGymClassHandler}>Add Post</button> */}
        </div>
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
    <div>
      <p>{props.class.gymLocation}</p>
      <p>{props.class.classType}</p>
      <p>{props.class.className}</p>
      <p>{props.class.timeOfDay}</p>
    </div>
  );
}

export default CreateGymClass;
