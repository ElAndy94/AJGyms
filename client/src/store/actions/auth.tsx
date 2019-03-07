import axios from 'axios';

import * as actionTypes from './actionTypes';

interface UserInfo {
  userId: string;
  name: string;
  isAdmin: boolean;
  isPt: boolean;
  email: string;
  password: string;
  token: string;
}

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (
  userId: UserInfo,
  token: UserInfo,
  name: UserInfo,
  isPt: UserInfo,
  isAdmin: UserInfo
) => {
  // console.log('%c User Info', 'color: orange; font-weight: bold;', [userId, name, isAdmin, isPt]);
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    token: token,
    name: name,
    isPt: isPt,
    isAdmin: isAdmin
  };
};

export const authFail = (error: string) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = experationTime => {
  console.log(experationTime);
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, experationTime * 1000);
  };
};

export const auth = (email: UserInfo, password: UserInfo) => {
  return (dispatch: any) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password
    };
    axios
      .post('/api/auth/login', authData)
      .then(res => {
        const expirationDate: any = new Date(
          new Date().getTime() + res.data.tokenExpiration * 1000
        );
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data._id);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('pt', res.data.pt);
        localStorage.setItem('admin', res.data.admin);
        dispatch(
          authSuccess(
            res.data._id,
            res.data.token,
            res.data.name,
            res.data.pt,
            res.data.admin
          )
        );
        dispatch(checkAuthTimeout(res.data.tokenExpiration));
      })
      .catch(err => {
        dispatch(authFail(err.response.error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token: any = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId: any = localStorage.getItem('userId');
        const name: any = localStorage.getItem('name');
        const isPt: any = localStorage.getItem('isPt');
        const isAdmin: any = localStorage.getItem('isAdmin');
        dispatch(authSuccess(userId, token, name, isPt, isAdmin));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
