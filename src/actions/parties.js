import axios from 'axios';
import { GET_PARTIES, UPDATE_PARTY, DELETE_PARTY, ADD_PARTY } from './types';

const url = process.env.REACT_APP_API_URL;
console.log('the url', url);
// GET PARTIES
export const getParties = () => (dispatch) => {
    axios
        .get(`${url}/api/v1/parties`)
        .then((res) => {
            dispatch({
                type: GET_PARTIES,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

export const updateParty = (id, updateData) => (dispatch) => {
    axios
        .put(`${url}/api/v1/parties/${id}`, updateData)
        .then((res) => {
            dispatch({
                type: UPDATE_PARTY,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

export const deleteParty = (id) => (dispatch) => {
    axios
        .delete(`${url}/api/v1/parties/${id}`)
        .then((res) => {
            dispatch({
                type: DELETE_PARTY,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

export const addParty = (party) => (dispatch) => {
    console.log('the real party', party);
    const profileForm = new FormData();
    Object.keys(party).map(async (key) => {
        profileForm.append(key, party[key]);
    });
    axios
        .post(`${url}/api/v1/parties/add`, profileForm, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            dispatch({
                type: ADD_PARTY,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};
