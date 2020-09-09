import { actionTypes } from './actions';

import { makeByIdReducer } from  '@sfstuebingen/curb/helpers';

import SI from 'seamless-immutable';

// A job transforms the given originalText into tokens via an API call.
// defaultJobState models the state for one job.
//
// NB: It is a good idea to keep representations of state like this as
// minimal as possible. For example, there is no status field in this
// representation, because the job status is implicit in the other
// fields: a job with originalText but no tokens and no error
// has been submitted but is not completed; a job with both
// originalText and tokens has completed successfully. It is
// usually better to calculate a status message from this information
// at the point where it is needed, rather than managing a redundant
// field in the state via Redux.
const defaultJobState = SI({
    id: undefined,
    originalText: undefined,
    tokens: undefined,
    error: undefined
});

// Reducer to manage the state for one job.
//
// NB: notice how the seamless-immutable library makes it easy to
// represent these state transitions declaratively via methods like
// .merge(). Use it to your advantage! Avoid updating state
// imperatively/via mutation.
function innerJobReducer(state = defaultJobState, action) {
    switch (action.type) {
    case actionTypes.JOB_SUBMITTED: {
        return state.merge({
            id: action.id,
            originalText: action.originalText,
            tokens: undefined,
            error: undefined
        });
    }
    case actionTypes.JOB_DONE: {
        return state.merge({
            tokens: action.tokens,
            error: undefined
        });
    }
    case actionTypes.JOB_ERROR: {
        return state.merge({
            error: action.error,
            tokens: undefined
        });
    }

    default: {
        return state;
    }
    }
}

// Default state for all jobs, indexed by ID. The state for a
// particular job is accessible at globalState.jobs.byId[<jobId>]
const defaultJobsState = SI({
    byId: {}
});

// Reducer which manages the state for all jobs.
// 
// NB: This reducer reflects a typical pattern in Redux, especially
// when dealing with a JSON API: you need to keep track of several
// objects, each of which has an ID. The action types dealing with
// those objects must specify an ID, and the part of the state in
// which the objects are stored is indexed by ID.
//
// The jobs reducer has been written out explicitly here to illustrate
// how to implement this pattern. The work is divided between
// innerJobReducer, which handles updating the state for a particular
// job, and the jobs function below, which handles storing and
// updating the state for all jobs, indexed by ID.
//
// There is a helper function in curb, makeByIdReducer,
// which can create reducers that implement this pattern. Using that
// helper, the jobs() reducer could instead be expressed in one line:
// 
// export const jobs = makeByIdReducer(innerJobReducer, actionTypes);
export function jobs(state = defaultJobsState, action) {
    // this saves us the trouble of calling the inner reducer if the
    // action is not a job action (and prevents throwing the error
    // below in such cases):
    if (!(action.type in actionTypes)) return state; 

    // an ID is required on all job actions:
    if (!action.id) throw new Error(`${action.type} emitted with no defined id`);

    // here we use the innerJobReducer to get an updated state for the
    // job in question, and then store the updated job state under the
    // appropriate ID in state.jobs.byId:
    const oldJobState = state.byId[action.id];
    const newJobState = innerJobReducer(oldJobState, action);

    return SI.setIn(state, ["byId", action.id], newJobState);
    
}



