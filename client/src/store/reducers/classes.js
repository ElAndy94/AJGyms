import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    gymClasses: [],
    filteredClasses: [],
    error: null,
    loading: false
};

const fetchClassesStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const fetchClassesSuccess = (state, action) => {
    console.table('reducer ', [state]);
    return updateObject(state, { 
        gymClasses: action.gymClasses,
        filteredClasses: action.filteredClasses,
        loading: false
    });
};

const fetchClassesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CLASSES_START: return fetchClassesStart(state, action);
        case actionTypes.FETCH_CLASSES_SUCCESS: return fetchClassesSuccess(state, action);
        case actionTypes.FETCH_CLASSES_FAIL: return fetchClassesFail(state, action);
        default: 
            return state;
    }
};

export default reducer;