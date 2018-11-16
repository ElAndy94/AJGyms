import React, { Component } from 'react';
import axios from 'axios';

import Aux from '../../hoc/ReactAux';
import GymTimetable from '../../components/GymTimetable/GymTimetable';
import classes from './GymClasses.css';
import FullGymClass from './FullGymClass/FullGymClass';
import { updateObject, checkValidity } from '../../shared/utility';
import Input from '../../components/UI/Input/Input';
// import Button from '../../components/UI/Button/Button';

class GymClasses extends Component {
  state = {
    gymClasses: [],
    filteredClasses: [],
    gymForm: {
      gymLocation: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'All Gyms', displayValue: 'All Gyms'},
            {value: 'Market Street', displayValue: 'Market Street'},
            {value: 'Portland Street', displayValue: 'Portland Street'},
            {value: 'Oxford Road', displayValue: 'Oxford Road'},
          ]
        },
        value: 'All Gyms',
        validation: {},
        valid: true
      },
      // trainer: {
      //   elementType: 'select',
      //   elementConfig: {
      //     options: [
      //       {value: 'All Trainers', displayValue: 'All Trainers'},
      //       {value: 'Jeff Bren', displayValue: 'Jeff Bren'},
      //       {value: 'Ralf Tomson', displayValue: 'Ralf Thomson'},
      //       {value: 'Jessica White', displayValue: 'Jessica White'},
      //       {value: 'Brenden Fin', displayValue: 'Brenden Fin'},
      //       {value: 'Charles Kip', displayValue: 'Charles Kip'},
      //     ]
      //   },
      //   value: 'All Trainers',
      //   validation: {},
      //   valid: true
      // },
      classType: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'All Classes', displayValue: 'All Classes'},
            {value: 'Induction Only', displayValue: 'Induction Only'},
            {value: 'Classes Only', displayValue: 'Classes Only'},
            {value: 'Digital Classes Only', displayValue: 'Digital Classes Only'},
          ]
        },
        value: 'All Classes',
        validation: {},
        valid: true
      },
      timeOfDay: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'All Day', displayValue: 'All Day' },
            {value: 'Morning (06:00 - 07:00)', displayValue: 'Morning (06:00 - 07:00)'},
            {value: 'Morning (07:00 - 08:00)', displayValue: 'Morning (07:00 - 08:00)'},
            {value: 'Morning (08:00 - 09:00)', displayValue: 'Morning (08:00 - 09:00)'},
            {value: 'Morning (09:00 - 10:00)', displayValue: 'Morning (09:00 - 10:00)'},
            {value: 'Morning (10:00 - 11:00)', displayValue: 'Morning (10:00 - 11:00)'},
            {value: 'Morning (11:00 - 12:00)', displayValue: 'Morning (11:00 - 12:00)'},
            {value: 'Afternoon (12:00 - 13:00)', displayValue: 'Afternoon (12:00 - 13:00)'},
            {value: 'Afternoon (13:00 - 14:00)', displayValue: 'Afternoon (13:00 - 14:00)'},
            {value: 'Afternoon (14:00 - 15:00)', displayValue: 'Afternoon (14:00 - 15:00)'},
            {value: 'Afternoon (15:00 - 16:00)', displayValue: 'Afternoon (15:00 - 16:00)'},
            {value: 'Afternoon (16:00 - 17:00)', displayValue: 'Afternoon (16:00 - 17:00)'},
            {value: 'Evening (17:00 - 18:00)', displayValue: 'Evening (17:00 - 18:00)'},
            {value: 'Evening (18:00 - 19:00)', displayValue: 'Evening (18:00 - 19:00)'},
            {value: 'Evening (19:00 - 20:00)', displayValue: 'Evening (19:00 - 20:00)'},
            {value: 'Evening (20:00 - 21:00)', displayValue: 'Evening (20:00 - 21:00)'},
            {value: 'Noon (21:00 - 22:00)', displayValue: 'Noon (21:00 - 22:00)'},
          ]
        },
        value: 'All Day',
        validation: {},
        valid: true,
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
        this.setState({gymClasses: updatedGymClasses, filteredClasses: updatedGymClasses});
        console.log(this.state.gymClasses);
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

    const theEvent = event.target.value;

    this.checkEvent(theEvent);

    this.setState({gymForm: updatedGymForm, formIsValid: formIsValid});
  }

  checkEvent(theEvent) {
    if (theEvent.includes("Morning") || theEvent.includes("Afternoon") || theEvent.includes("Evening") ||  theEvent.includes("Noon")) {
      this.filterClasses(theEvent, 'time');

    } else if (theEvent.includes("Market Street") || theEvent.includes("Portland Street") || theEvent.includes("Oxford Road")) {
      this.filterClasses(theEvent, 'location');

    } else if (theEvent.includes("Induction Only") || theEvent.includes("Digital Class Only") || theEvent.includes("Classes Only")) {
      this.filterClasses(theEvent, 'type');
    }
  }

  filterClasses(selectedValue, type) {
    // Filter through the classes and only have ones that apply the search term
    const newFilteredClasses = this.state.filteredClasses.filter( (value) => {
      return value[type] === selectedValue;
    });

    this.setState({filteredClasses: newFilteredClasses});
  }

  classSelectedHandler = (id) => {
    this.setState({selectedClassId: id});
  }

  handleDelete = (id) => {
    const updatedFilteredClasses = this.state.gymClasses.filter( (value) => {
      return value._id !== id;
    });
    this.setState({ filteredClasses: updatedFilteredClasses, selectedClassId: null });
  }

  render() {
    const gymClasses = this.state.filteredClasses.map(gymClass => {
      return  (
      <GymTimetable
        key={gymClass._id}
        location={gymClass.location}
        classType={gymClass.type}
        className={gymClass.name}
        startTime={gymClass.time}
        ptName={gymClass.ptName}
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
        <div className={classes.BackGround}>
            <div className={classes.GymClasses}>
              <h3>Select, book and enjoy!</h3>
              {form}
            </div>
            <div className={classes.Classes}>
              {gymClasses}
            </div>
            <div className={classes.BackGroundTwo}>
              <FullGymClass userId={this.props.userId} id={this.state.selectedClassId} onDelete={this.handleDelete} />
            </div>
        </div>
      </Aux>
    );
  }
};

export default GymClasses;
