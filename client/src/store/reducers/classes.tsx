import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

interface State {
  gymClasses: any[];
  filteredClasses: any[];
  classes: any[];
  error: null;
  loading: false;
  type?: any;
}

const initialState: any = {
  gymClasses: [],
  filteredClasses: [],
  classes: [],
  error: null,
  loading: false
};

const fetchClassesStart = (state: State, action: State) => {
  return updateObject(state, { error: null, loading: true });
};

const fetchClassesSuccess = (state: State, action: State) => {
  return updateObject(state, {
    gymClasses: action.gymClasses,
    filteredClasses: action.filteredClasses,
    loading: false
  });
};

const fetchClassesFail = (state: State, action: State) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const filterClasses = (state: State, action: State) => {
  return updateObject(state, {
    gymClasses: action.gymClasses,
    filteredClasses: action.filteredClasses
  });
};

const classBooked = (state: State, action: State) => {
  return updateObject(state, { loading: false });
};

const deleteClass = (state: State, action: State) => {
  return updateObject(state, {
    gymClasses: action.gymClasses,
    filteredClasses: action.filteredClasses
  });
};

const bookedClasses = (state: State, action: State) => {
  return updateObject(state, {
    classes: action.classes
  });
};

const reducer = (state = initialState, action: State) => {
  switch (action.type) {
    case actionTypes.FETCH_CLASSES_START:
      return fetchClassesStart(state, action);
    case actionTypes.FETCH_CLASSES_SUCCESS:
      return fetchClassesSuccess(state, action);
    case actionTypes.FETCH_CLASSES_FAIL:
      return fetchClassesFail(state, action);
    case actionTypes.FILTER_CLASSES:
      return filterClasses(state, action);
    case actionTypes.CLASS_BOOKED:
      return classBooked(state, action);
    case actionTypes.DELETE_CLASS:
      return deleteClass(state, action);
    case actionTypes.BOOKED_CLASSES:
      return bookedClasses(state, action);
    default:
      return state;
  }
};

export default reducer;
