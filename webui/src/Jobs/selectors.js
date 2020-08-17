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

// Returns an array of all current jobs
export function selectAllJobs(globalState) {
    try {
        // the final filter removes "dead" jobs that have an ID but no
        // longer have state from the list:
        return Object.values(globalState.jobs.byId).filter(job => job);
    } catch (e) {
        return []; 
    }
}

// Returns the next available job id. 
export function nextJobId(globalState) {
    const jobsState = globalState.jobs.byId || {};
    const allIds = Object.keys(jobsState)
                         .map(key => parseInt(key))
                         .filter(id => id); // remove NaN
    const nextId = Math.max(allIds) + 1;

    return nextId.toString();
}

