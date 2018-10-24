import React, { Component } from 'react'

import classes from './CreateGymClass.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { updateObject, checkValidity } from '../../shared/utility';

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
      timeOfDay: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'AllDay', displayValue: 'All Day'},
            {value: 'Morning', displayValue: 'Morning (06:00 - 09:00)'},
            {value: 'Noon', displayValue: 'Noon (09:00 - 12:00)'},
            {value: 'Afternoon', displayValue: 'Afternoon (12:00 - 17:00)'},
            {value: 'Evening', displayValue: 'Evening (17:00 - 21:00)'},
          ]
        },
        value: '09:00',
        validation: {},
        valid: true
      },
    },
    formIsValid: false,
  }

  createClassHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.createClassForm) {
      formData[formElementIdentifier] = this.state.createClassForm[formElementIdentifier].value;
    }
    const Createclass = {
      classData: formData,
      userId: this.props.userId
    }
    this.props.onCreateClass(Createclass);
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
          <Button btnType="Success" disabled={!this.state.formIsValid}>Add Class</Button>
        </form>
    );
    return (
      <div className={classes.CreateGymClass}>
        <h3>Careful when creating a class!</h3>
        {form}
      </div>
     );
  }
}

export default CreateGymClass;
