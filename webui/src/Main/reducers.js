import { jobs } from '../Jobs/reducers';
import { actionTypes } from './actions';

import SI from 'seamless-immutable';
import { combineReducers } from 'redux';

function apiinfo(state = SI({}), action) {
    switch (action.type) {
        case actionTypes.APIINFO_FETCH_SUCCESS:
            return SI(action.info);
        default:
            return state;
    }
}

// the root reducer for the whole project.
export const rootReducer = combineReducers({
    apiinfo,
    jobs,
});

