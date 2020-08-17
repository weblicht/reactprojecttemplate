// actions.js
// Actions for Jobs
import { apiPath } from '../constants';
import { actionTypesFromStrings } from '../utils/utils';

import axios from 'axios';

export const actionTypes = actionTypesFromStrings([
    'JOB_SUBMITTED',
    'JOB_DONE',
    'JOB_ERROR',
    'JOB_REMOVE',
]);

// Simple action creators for each stage in the job lifecycle.
// 
// NB: All these functions do is return a Redux action, i.e., an
// object with a .type field. It may seem like overkill to have a
// dedicated function for each of these actions, and in this simple
// application, it probably *is* overkill. But it's good design to
// provide such functions instead of constructing the actions directly
// at the point where they are dispatched, because this separates the
// internal data representation used in actions and reducers from the
// interface used by external code, allowing them to change
// independently as the application grows. Also, it reduces the number
// of curly braces at the point where you dispatch the action, which
// is always a good thing. ;)
function submitJob(id, originalText) {
    return {
        type: actionTypes.JOB_SUBMITTED,
        id,
        originalText
    };
}

function completeJob(id, tokenizedText) {
    return {
        type: actionTypes.JOB_DONE,
        id,
        tokenizedText
    };
}

function removeJob(id) {
    return {
        type: actionTypes.JOB_REMOVE,
        id,
    };
}

function errorInJob(id, error) {
    return {
        type: actionTypes.JOB_ERROR,
        id,
        error
    }
}

// Asynchronous action creator. Manages the whole job lifecycle, from
// submission to completion, by dispatching the simple actions above.
//
// NB: runJob is a good example of a common Redux pattern: an
// asynchronous action creator makes an API request and dispatches a
// series of actions, which indicate each part of the interaction with
// the API (request, successful response, failure).
export function runJob(originalText) {
    return function (dispatch, getState) {
        const jobId = nextJobId(getState());
        
        dispatch(submitJob(jobId, originalText));
        return axios.post(apiPath.split, { text: originalText })
              .then(response => dispatch(completeJob(jobId, response.data)))
              .catch(error => dispatch(errorInJob(jobId, error)));
    }
}
