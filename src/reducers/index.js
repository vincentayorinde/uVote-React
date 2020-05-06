import { combineReducers } from 'redux';
import parties from './parties';
import errors from './errors';
import success from './success';
import auth from './auth';
import candidates from './candidates';
import voters from './voters';
import results from './results';
import vote from './vote';
import statistics from './statistics';

export default combineReducers({
    parties,
    errors,
    success,
    auth,
    candidates,
    voters,
    results,
    vote,
    statistics
});
