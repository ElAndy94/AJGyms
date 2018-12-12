import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId, name, isAdmin, isPt) => {
    // console.log('%c User Info', 'color: orange; font-weight: bold;', [userId, name, isAdmin, isPt]);
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        name: name,
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

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
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
                dispatch(authSuccess(res.data._id, res.data.name, res.data.admin, res.data.pt));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })

    };
};

// export const checkAuthTimeout = (experationTime) => {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch(logout());
//         }, experationTime * 1000);
//     }
// } 

// export const authCheckState = () => {
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         dispatch(logout());
    //     } else {
    //         const expirationDate = new Date(localStorage.getItem('expirationDate'));
    //         if (expirationDate <= new Date()) {
    //             dispatch(logout());
    //         } else {
    //             const userId = localStorage.getItem('userId');
    //             dispatch(authSuccess(token, userId));
    //             dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
    //         }   
    //     }
    // };
// };