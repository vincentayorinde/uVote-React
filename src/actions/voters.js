
import { axiosCall, setErrors } from '../utils';

import {
    GET_VOTERS,
    GET_SUCCESS,
    CLEAN_UP,
    LOADING,
} from './types';


export const cleanUp = () => ({
    type: CLEAN_UP,
});
// GET PARTIES
export const getVoters = () => async (dispatch) => {
    try {
        const result = await axiosCall({ path: '/api/v1/voters', payload: null, method: 'get' });
        console.log('the result', result)
        dispatch({
            type: GET_VOTERS,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const updateVoter = (id, updateData) => async (dispatch) => {
    try {
        const result = await axiosCall({ path: `/api/v1/voters/${id}`, payload: updateData, method: 'put', });
        console.log('the result', result)
        dispatch({
            type: GET_SUCCESS,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const deleteVoter = (id) => async (dispatch) => {
    try {
        const result = await axiosCall({ path: `/api/v1/voters/${id}`, payload: null, method: 'delete', });
        console.log('the result', result)
        dispatch({
            type: GET_SUCCESS,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
};

export const addVoter = (voter) => async (dispatch) => {
    dispatch({
        type: LOADING
    });
    // const candidateData = new FormData();
    // Object.keys(candidate).map(async (key) => {
    //     candidateData.append(key, candidate[key]);
    // });
    // console.log('the candidate', candidateData)
    try {
        const result = await axiosCall({ path: '/api/v1/voters/add', payload: voter, method: 'post'});
        console.log('the result', result)
        dispatch({
            type: GET_SUCCESS,
            payload: result,
        });
      } catch (error) {
        dispatch(setErrors(error));
      }
    };
