// selectors.js
// Selector functions for Jobs state

// NB: selector functions allow you retrieve some piece of the global
// state (or a default value or undefined if it is not yet available).
// It is a good idea to write and use selector functions instead of
// retrieving values directly from the state, because it allows you to
// more easily re-arrange the application's state model as the
// application grows.
//
// A selector is different from a mapStateToProps function of the sort
// you pass to connect(). A selector function's job is to get some
// piece of data *out* of the Redux store. A mapStateToProps
// function's job is to get some data *into* a component's props.
// These are distinct roles. For example, consider a component that
// needs multiple pieces of data from different parts of the store. In
// that case, you'd call several different selectors inside its
// mapStateToProps function.


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
        return Object.values(globalState.jobs.byId);
    } catch (e) {
        return []; 
    }
}

// Returns the next available job id. 
export function nextJobId(globalState) {
    const jobsState = globalState.jobs.byId || {};
    let nextId = Object.keys(jobsState).length + 1; 
    // ensure ID has not already been used:
    while (nextId.toString() in jobsState) {
        nextId++;
    }

    return nextId.toString();
}

