import axios from 'axios';
import {
    GET_PARTIES,
    UPDATE_PARTY,
    DELETE_PARTY,
    GET_SUCCESS,
    GET_ERRORS,
    CLEAN_UP,
} from './types';

const url = process.env.REACT_APP_API_URL;
console.log('the url', url);

export const cleanUp = () => ({
    type: CLEAN_UP,
});
// GET PARTIES
export const getParties = () => (dispatch, getState) => {
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
        .get(`${url}/api/v1/parties`, config)
        .then((res) => {
            dispatch({
                type: GET_PARTIES,
                payload: res.data,
            });
        })
        .catch((err) => console.log('the err', err.response));
};

export const updateParty = (id, updateData) => (dispatch, getState) => {
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
        .put(`${url}/api/v1/parties/${id}`, updateData, config)
        .then((res) => {
            dispatch({
                type: UPDATE_PARTY,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

export const deleteParty = (id) => (dispatch, getState) => {
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
        .delete(`${url}/api/v1/parties/${id}`, config)
        .then((res) => {
            dispatch({
                type: DELETE_PARTY,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

export const addParty = (party) => (dispatch, getState) => {
      // Headers
      const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    };
    const token = getState().auth.token;
    // If token, add to headers congig
    if (token) {
        config.headers['x-access-token'] = token;
    } 
    const partyData = new FormData();
    Object.keys(party).map(async (key) => {
        partyData.append(key, party[key]);
    });
    axios
        .post(`${url}/api/v1/parties/add`, partyData, config)
        .then((res) => {
            const success = {
                message: res.data,
                status: res.status,
            };
            dispatch({
                type: GET_SUCCESS,
                payload: success,
            });
        })
        .catch((err) => {
            const errors = {
                message: err.response.data,
                status: err.response.status,
            };
            dispatch({
                type: GET_ERRORS,
                payload: errors,
            });
        });
};
