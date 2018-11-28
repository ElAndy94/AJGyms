import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId, isAdmin, isPt) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        isAdmin: isAdmin,
        isPt: isPt
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };
        axios.post('/api/auth/login', authData)
            .then(res => {
                dispatch(authSuccess(res.data._id, res.data.isAdmin, res.data.isPt));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })

    };
};