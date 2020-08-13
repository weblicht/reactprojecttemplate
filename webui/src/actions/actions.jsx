import axios from 'axios';
import { apiPath, actionType } from '../constants';

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
