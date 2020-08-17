// selectors.js
// Selector functions for Jobs state

// NB: selector functions allow you retrieve some piece of the global
// state (or a default value or undefined if it is not yet available).
// It is a good idea to write and use selector functions instead of
// retrieving values directly from the state, because it allows you to
// more easily re-arrange the application's state model as the
// application grows.


// Returns the state of the job with the given id.
export function selectJob(globalState, id) {
    try {
        return globalState.jobs.byId[id];
    } catch (e) {
        return undefined;
    }
}

// Returns the next available job id. 
export function nextJobId(globalState) {
    const jobsState = globalState.jobs || {};
    const allIds = Object.keys(jobsState); // TODO: filter out non-numerical?

    return Math.max(ids) + 1;
}

