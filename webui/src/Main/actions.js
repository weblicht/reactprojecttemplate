import { apiPath } from '../constants';

import { makeActionTypes } from '@sfstuebingen/curb/helpers';
import axios from 'axios';

export const actionTypes = makeActionTypes([
    'APIINFO_FETCH_SUCCESS',
]);

export function fetchApiInfo() {
    return function (dispatch, getState) {
        axios.get(apiPath.apiinfo).then(response => {
            dispatch({
                type: actionTypes.APIINFO_FETCH_SUCCESS,
                info: response.data
            });
        }).catch(console.warn("Cannot fetch API info."));
    }
}
