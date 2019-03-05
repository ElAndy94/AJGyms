import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';

export const fetchStart = () => {
  return {
    type: actionTypes.FETCH_CLASSES_START
  };
};

export const fetchClassesSuccess = (updatedGymClasses: []) => {
  // console.log('%c Gym Classes', 'color: orange; font-weight: bold;', [updatedGymClasses]);
  return {
    type: actionTypes.FETCH_CLASSES_SUCCESS,
    gymClasses: updatedGymClasses,
    filteredClasses: updatedGymClasses
  };
};

export const fetchClassesFail = (error: string) => {
  return {
    type: actionTypes.FETCH_CLASSES_FAIL,
    error: error
  };
};

export const fetchClasses = () => {
  return (dispatch: any) => {
    dispatch(fetchStart());
    axios
      .get('/api/classes')
      .then(response => {
        const gymClasses = response.data;
        const updatedGymClasses = gymClasses.map((gymClass: []) => {
          return {
            ...gymClass
          };
        });
        dispatch(fetchClassesSuccess(updatedGymClasses));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const filterClasses = (newFilteredClasses: []) => ({
  type: actionTypes.FILTER_CLASSES,
  gymClasses: newFilteredClasses,
  filteredClasses: newFilteredClasses
});

export const deleteClass = (updatedFilteredClasses: []) => ({
  type: actionTypes.DELETE_CLASS,
  gymClasses: updatedFilteredClasses,
  filteredClasses: updatedFilteredClasses
});

export const classBookedSuccess = () => ({
  type: actionTypes.CLASS_BOOKED
});

export const bookClass = (bookingData: []) => {
  return (dispatch: any) => {
    axios
      .post('/api/classes/bookclass', bookingData)
      .then(response => {
        dispatch(classBookedSuccess());
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const bookedClasses = (id: string) => {
  return (dispatch: any) => {
    axios
      .get('/api/auth/booked/' + id)
      .then(response => {
        const classes = response.data;
        const updatedClasses = classes.map((gymClass: []) => {
          return {
            ...gymClass
          };
        });
        dispatch(bookedClassesSuccess(updatedClasses));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const bookedClassesSuccess = (updatedClasses: []) => ({
  type: actionTypes.BOOKED_CLASSES,
  classes: updatedClasses
});
