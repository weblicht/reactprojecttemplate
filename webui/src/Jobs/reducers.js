import { actionTypes } from './actions';
import { makeByIdReducer } from '../utils/utils';

import SI from 'seamless-immutable';

// A job transforms the given originalText into tokenizedText via an API call.
// defaultJobState models the state for one job.
//
// NB: It is a good idea to keep representations of state like this as
// minimal as possible. For example, there is no status field in this
// representation, because the job status is implicit in the other
// fields: a job with originalText but no tokenizedText and no error
// has been submitted but is not completed; a job with both
// originalText and tokenizedText has completed successfully. It is
// usually better to calculate a status message from this information
// at the point where it is needed, rather than managing a redundant
// field in the state via Redux.
const defaultJobState = SI({
    originalText: undefined,
    tokenizedText: undefined,
    error: undefined
});

// Reducer to manage the state for one job.
//
// NB: notice how the seamless-immutable library makes it easy to
// represent these state transitions declaratively via methods like
// .merge(). Use it to your advantage! Avoid updating state
// imperatively, via mutation.
export function innerJobReducer(state = defaultJobState, action) {
    switch (action.type) {
    case actionTypes.JOB_SUBMITTED: {
        return state.merge({
            originalText: action.originalText,
            tokenizedText: undefined,
            error: undefined
        });
    }
    case actionTypes.JOB_DONE: {
        return state.merge({
            tokenizedText: action.tokenizedText,
            error: undefined
        });
    }
    case actionTypes.JOB_ERROR: {
        return state.merge({
            error: action.error,
            tokenizedText: undefined
        });
    }
    case actionTypes.JOB_REMOVE: {
        return undefined;
    }
    default: {
        return state;
    }
    }
}

export const jobs = makeByIdReducer(innerJobReducer, actionTypes);

