import { combineReducers } from 'redux';
import parties from './parties';
import errors from './errors';
import success from './success';

export default combineReducers({
    parties,
    errors,
    success
});
