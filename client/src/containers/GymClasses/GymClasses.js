import React, { Component } from 'react';
import axios from 'axios';

import Aux from '../../hoc/ReactAux';
import GymTimetable from '../../components/GymTimetable/GymTimetable';
import Input from '../../components/UI/Input/Input';
import classes from './GymClasses.css';
import FullGymClass from './FullGymClass/FullGymClass';
import { updateObject, checkValidity } from '../../shared/utility';
// import Button from '../../components/UI/Button/Button';

class GymClasses extends Component {
  state = {
    gymClasses: [],
    gymForm: {
      gymLocation: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'AllGym', displayValue: 'All Gym'},
            {value: 'MarketStreet', displayValue: 'Market Street'},
            {value: 'PortlandStreet', displayValue: 'Portland Street'},
            {value: 'OxfordRoad', displayValue: 'Oxford Road'},
          ]
        },
        value: 'AllGym',
        validation: {},
        valid: true
      },
      trainer: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'AllTrainers', displayValue: 'All Trainers'},
            {value: 'JeffBren', displayValue: 'Jeff Bren'},
            {value: 'RalfTomson', displayValue: 'Ralf Thomson'},
            {value: 'JessicaWhite', displayValue: 'Jessica White'},
            {value: 'BrendenFin', displayValue: 'Brenden Fin'},
            {value: 'CharlesKip', displayValue: 'Charles Kip'},
          ]
        },
        value: 'AllTrainers',
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
        value: 'AllDay',
        validation: {},
        valid: true
      },
    },
    formIsValid: false,
  }

  componentDidMount() {
    axios.get('/api/classes')
      .then(response => {
        const gymClasses = response.data;
        const updatedGymClasses = gymClasses.map(gymClass => {
          return {
            ...gymClass,
            // author: 'Andrew'
          }
        });
        this.setState({gymClasses: updatedGymClasses});
      })
      .catch(error => {
        console.log(error);
      });
  }

  classBookHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.gymForm) {
      formData[formElementIdentifier] = this.state.gymForm[formElementIdentifier].value;
    }
    const selectedClass = {
      classData: formData,
      userId: this.props.userId
    }
    this.props.onCreateClass(selectedClass);
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(this.state.gymForm[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.gymForm[inputIdentifier].validation),
        touched: true
    });
    const updatedGymForm = updateObject(this.state.gymForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedGymForm) {
      formIsValid = updatedGymForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({gymForm: updatedGymForm, formIsValid: formIsValid});
  }

  classSelectedHandler = (id) => {
    this.setState({selectedClassId: id});
    // this.props.history.push('/' + id);
    // this.props.history.push({pathname: '/posts/' + id});
  }

  render() {
    const gymClasses = this.state.gymClasses.map(gymClass => {
      return  (
      <GymTimetable
        key={gymClass._id}
        location={gymClass.location}
        classType={gymClass.type}
        className={gymClass.name}
        startTime={gymClass.time}
        clicked={() => this.classSelectedHandler(gymClass._id)}/>
      );
    });

    const formElementsArray = [];
    for (let key in this.state.gymForm) {
      formElementsArray.push({
        id: key,
        config: this.state.gymForm[key]
      });
    }
    let form = (
      <form onSubmit={this.classBookHandler}>
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
          {/* <Button btnType="Success" disabled={!this.state.formIsValid}>Book Class</Button> */}
        </form>
    );
    return (
      <Aux>
        <div className={classes.GymClasses}>
          <h3>Select, book and enjoy!</h3>
          {form}
        </div>
        <section className={classes.Classes}>
          {gymClasses}
        </section>
        <section>
          <FullGymClass userId={this.props.userId} id={this.state.selectedClassId} />
        </section>
      </Aux>
    );
  }
};

export default GymClasses;
