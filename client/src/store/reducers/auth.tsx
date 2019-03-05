import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

interface State {
  userId: string;
  name: string;
  isAdmin: boolean;
  isPt: boolean;
  error: null;
  loading: boolean;
  type?: any;
}

const initialState: any = {
  // token: null,
  userId: '',
  name: '',
  isAdmin: false,
  isPt: false,
  error: null,
  loading: false
};

const authStart = (state: State, action: State) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state: State, action: State) => {
  // console.table([action]);
  return updateObject(state, {
    // token: action.idToken,
    userId: action.userId,
    name: action.name,
    isAdmin: action.isAdmin,
    isPt: action.isPt,
    error: null,
    loading: false
  });
};

const authFail = (state: State, action: State) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state: State, action: State) => {
  return updateObject(state, {
    userId: '',
    name: '',
    isAdmin: false,
    isPt: false
  });
};

const reducer = (state = initialState, action: State) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
