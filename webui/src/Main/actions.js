import { apiPath } from '../constants';

import { actionTypesFromStrings } from '@sfstuebingen/germanet-common/helpers';
import axios from 'axios';

export const actionTypes = actionTypesFromStrings([
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
