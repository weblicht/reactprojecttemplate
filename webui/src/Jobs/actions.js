// actions.js
// Actions for Jobs
import { apiPath } from '../constants';

import axios from 'axios';

// TODO: actionTypesFromStrings
export const actionTypes = {
    JOB_SUBMITTED: 'JOB_SUBMITTED',
    JOB_DONE: 'JOB_DONE',
    JOB_REMOVE: 'JOB_REMOVE',
};

// TODO: this is not a good idea!
let JOBID = 1;

export function createJob(text) {
    return function (dispatch, getState)  {
        const fd = new FormData(); fd.append("text", text);
        const job = {
            id: JOBID++,
            originalText: text,
            tokenizedText: null,
            status: 'in progress',
        };

        dispatch({
            type: actionTypes.JOB_SUBMITTED,
            job: job,
        });

        axios
        .post(apiPath.split, fd)
        .then(response => {
            job.tokenizedText = response.data;
            job.status = 'done';
            dispatch({
                type: actionTypes.JOB_DONE,
                job: job,
            });
        });
        //TODO: .catch(errHandler(dispatch, "Cannot create job."));
    }
}

export function removeJobs(jobIDList) {
    return function (dispatch, getState)  {
        for (id in jobIDList) {
            dispatch({
                type: actionTypes.JOB_REMOVE,
                id: id,
            });
        }
    }
}

