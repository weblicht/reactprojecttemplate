import axios from 'axios';
import { push } from 'react-router-redux';
import { apiPath, actionType } from '../constants';
import { toPairs } from '../utils/utils';


export function fetchApiInfo() {
    return function (dispatch, getState) {
        axios.get(apiPath.apiinfo).then(response => {
            dispatch({
                type: actionType.APIINFO_FETCH_SUCCESS,
                info: response.data
            });
        }).catch(errHandler(dispatch, "Cannot fetch API info."));
    }
}

export function fetchJobs() {
    return function (dispatch, getState)  {
        axios
        .get(apiPath.jobs)
        .then(response => {
            dispatch({
                type: actionType.JOB_LIST_FETCH_SUCCESS,
                jobs: response.data.jobs
            });
        })
        .catch(errHandler(dispatch, "Cannot fetch jobs."));
    }
}

export function removeJobs(jobIDList) {
    return function (dispatch, getState)  {
        for (id in jobIDList) {
            axios
            .delete(apiPath.job(jobIDList[i]))
            .then(response => {
                dispatch({
                    type: actionType.JOB_REMOVAL_SUCCESS,
                    id: id,
                });
                dispatch(fetchJobs());
            }).catch(errHandler(dispatch, "Cannot remove job."));
        }
    }
}


export function handleSubmitJob() {
    return function (dispatch, getState) {
        const jobBuilder = getState().form.JobBuilder;
        const fd = new FormData();
        for (kv in toPairs(jobBuilder.values)) {
            fd.append(kv[0], kv[1])
        }
        axios
        .post(apiPath.jobs, fd)
        .then(response => {
            dispatch(push('/jobs' + '/' + response.data.jobID));
        })
        .catch(errHandler(dispatch, "Cannot create job."));
    }
}



export function errHandler(dispatch, msg) {
    return function(err) {
        // TOOD: check that alerts are shown
        const alert = (message) => {
            console.warn(message);
            dispatch({
                type: actionType.ERROR,
                message: message,
            });
        };
        const response = err.response || {};
        if (response.status == 401) {
            alert("Please login");
        } else if (response.status == 403) {
            alert("Access denied. "+(response.data || ""));
        } else {
            if (!msg && err.response) {
                msg ="An error occurred while contacting the server.";
            }
            if (response.data && response.data.message) {
                msg += " " + response.data.message;
            }
            if (msg) {
                alert(msg);
            } else {
                console.error(err);
            }
        }
    }
}
