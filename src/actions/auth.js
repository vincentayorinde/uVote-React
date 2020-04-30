import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    CLEAN_UP_AUTH,
    GET_ERRORS
} from './types';

export const cleanUpAuth = () => ({
    type: CLEAN_UP_AUTH,
});

const url = process.env.REACT_APP_API_URL;
// LOAD USER
export const loadUser = () => (dispatch, getState) => {
    const token = getState().auth.token;
    // If token, add to headers congig
    if (token) {
        dispatch({
            type: USER_LOADED,
            payload: getState().auth.user,
        });
    } else {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// LOGIN
export const login = (values) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    console.log('the login', values);
    axios
        .post(`${url}/api/v1/users/signin`, values, config)
        .then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log('errors', err.response.data)
            const errors = {
                message: err.response.data,
                status: err.response.status,
            };
            dispatch({
                type: LOGIN_FAIL,
                payload: errors,
            });
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        });
};

// LOG OUT
export const logout = () => (dispatch, getState) => {
     // Headers
     const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const token = getState().auth.token;
    // If token, add to headers congig
    if (token) {
        config.headers['x-access-token'] = token;
    } 
    axios
        .post(`${url}/api/v1/users/signout`, null, config)
        .then((res) => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        })
        .catch((err) => {
            const errors = {
                message: err.response.data,
                status: err.response.status,
            };
            console.log('the errors', errors)
        });
};
