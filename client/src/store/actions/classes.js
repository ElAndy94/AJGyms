import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';

export const fetchStart = () => {
    return {
        type: actionTypes.FETCH_CLASSES_START
    };
};

export const fetchClassesSuccess = (updatedGymClasses) => {
    console.log('%c Gym Classes', 'color: orange; font-weight: bold;', [updatedGymClasses]);
    return {
        type: actionTypes.FETCH_CLASSES_SUCCESS,
        gymClasses: updatedGymClasses,
        filteredClasses: updatedGymClasses
    };
};

export const fetchClassesFail = (error) => {
    return {
        type: actionTypes.FETCH_CLASSES_FAIL,
        error: error
    };
};

export const fetchClasses = () => {
    return dispatch => {
        dispatch(fetchStart());
        axios.get('/api/classes')
            .then(response => {
                const gymClasses = response.data;
                const updatedGymClasses = gymClasses.map(gymClass => {
                return {
                    ...gymClass,
                }
                });
                dispatch(fetchClassesSuccess(updatedGymClasses));
                // dispatch(fetchClassesSuccess(res.data._id, res.data.name, res.data.admin, res.data.pt));
                // this.setState({gymClasses: updatedGymClasses, filteredClasses: updatedGymClasses});
            })
            .catch(err => {
                // dispatch(fetchClassesFail(err.response.data.error));
                console.log(err);
            });
    };
};