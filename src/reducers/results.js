import {
    GET_RESULTS,
    LOADING
} from '../actions/types';

const initialState = {
    results: {},
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RESULTS:
            return {
                ...state,
                results: action.payload,
                isLoading: false
            };
            case LOADING:
                return {
                    ...state,
                    isLoading: true
                };
        default:
            return {
                ...state,
                isLoading: false
            };
    }
}
