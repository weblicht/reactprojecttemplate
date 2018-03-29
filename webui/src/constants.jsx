const urlRoot = ""; // window.location.origin;

export const apiPath = {
    apiinfo:        `${urlRoot}/api/info`,
    jobs:           `${urlRoot}/api/jobs`,
    job:            (id) => `${urlRoot}/api/job/${id}`,
};


export const actionType = {
    APIINFO_FETCH_SUCCESS: 'APIINFO_FETCH_SUCCESS',

    JOB_LIST_FETCH_SUCCESS: 'JOB_LIST_FETCH_SUCCESS',

    JOB_REMOVAL_SUCCESS: 'JOB_REMOVAL_SUCCESS',

    ERROR: 'ERROR',
};
