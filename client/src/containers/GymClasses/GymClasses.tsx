import React, { Component } from 'react';
import { connect } from 'react-redux';

import GymTimetable from '../../components/GymTimetable/GymTimetable';
import './GymClasses.scss';
import FullGymClass from './FullGymClass/FullGymClass';
import { updateObject, checkValidity } from '../../shared/utility';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';

interface Props {
  userId: string;
  isPt: boolean;
  isAdmin: boolean;
  // selectedClassId: string;
  filteredClasses: any[];
  gymClasses: any[];
  onFetchClasses: () => void;
  onCreateClass: (any) => void;
  onFilterClasses: (any) => void;
  onDeleteClass: (any) => void;
}

export class GymClasses extends Component<Props> {
  state: any = {
    gymForm: {
      gymLocation: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'All Gyms', displayValue: 'All Gyms' },
            { value: 'Market Street', displayValue: 'Market Street' },
            { value: 'Portland Street', displayValue: 'Portland Street' },
            { value: 'Oxford Road', displayValue: 'Oxford Road' }
          ]
        },
        value: 'All Gyms',
        validation: {},
        valid: true
      },
      classType: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'All Classes', displayValue: 'All Classes' },
            { value: 'Induction Only', displayValue: 'Induction Only' },
            { value: 'Classes Only', displayValue: 'Classes Only' },
            {
              value: 'Digital Classes Only',
              displayValue: 'Digital Classes Only'
            }
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
            { value: 'All Day', displayValue: 'All Day' },
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
        value: 'All Day',
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  };

  componentWillMount() {
    this.props.onFetchClasses();
  }

  classBookHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.gymForm) {
      formData[formElementIdentifier] = this.state.gymForm[
        formElementIdentifier
      ].value;
    }
    const selectedClass = {
      classData: formData,
      userId: this.props.userId
    };
    this.props.onCreateClass(selectedClass);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(inputIdentifier);
    const updatedFormElement = updateObject(
      this.state.gymForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.gymForm[inputIdentifier].validation
        ),
        touched: true
      }
    );
    const updatedGymForm = updateObject(this.state.gymForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedGymForm) {
      formIsValid = updatedGymForm[inputIdentifier].valid && formIsValid;
    }

    const theEvent = event.target.value;

    this.checkEvent(theEvent, inputIdentifier);

    this.setState({ gymForm: updatedGymForm, formIsValid: formIsValid });
  };

  checkEvent(theEvent, inputIdentifier) {
    if (inputIdentifier === 'timeOfDay') {
      this.filterClasses(theEvent, 'time');
    } else if (inputIdentifier === 'gymLocation') {
      this.filterClasses(theEvent, 'location');
    } else if (inputIdentifier === 'classType') {
      this.filterClasses(theEvent, 'type');
    }
  }

  filterClasses(selectedValue, type) {
    // Filter through the classes and only have ones that apply the search term
    const newFilteredClasses = this.props.filteredClasses.filter(value => {
      return value[type] === selectedValue;
    });
    this.props.onFilterClasses(newFilteredClasses);
  }

  classSelectedHandler = id => {
    this.setState({ selectedClassId: id });
  };

  handleDelete = id => {
    const updatedFilteredClasses = this.state.gymClasses.filter(value => {
      return value._id !== id;
    });
    this.setState({ selectedClassId: null });
    this.props.onDeleteClass(updatedFilteredClasses);
  };

  render() {
    // console.table([this.props.filteredClasses]);
    const gymClasses = this.props.filteredClasses.map(gymClass => {
      return (
        <GymTimetable
          key={gymClass._id}
          location={gymClass.location}
          classType={gymClass.type}
          className={gymClass.name}
          startTime={gymClass.time}
          ptName={gymClass.ptName}
          clicked={() => this.classSelectedHandler(gymClass._id)}
        />
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
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
      </form>
    );
    return (
      <React.Fragment>
        <div className='BackGround__GymClasses'>
          <div className='GymClasses__form'>
            <h1>Select, book and enjoy!</h1>
            {form}
          </div>
          <div className='Gym__Classes'>{gymClasses}</div>
          <div className='Extention__SelectedGymClass'>
            <FullGymClass
              isPt={this.props.isPt}
              isAdmin={this.props.isAdmin}
              id={this.state.selectedClassId}
              onDelete={this.handleDelete}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  gymClasses: state.classes.gymClasses,
  filteredClasses: state.classes.filteredClasses
});

const mapDispatchToProps = dispatch => ({
  onFetchClasses: () => dispatch(actions.fetchClasses()),
  onFilterClasses: newFilteredClasses =>
    dispatch(actions.filterClasses(newFilteredClasses)),
  onDeleteClass: updatedFilteredClasses =>
    dispatch(actions.deleteClass(updatedFilteredClasses))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GymClasses);
