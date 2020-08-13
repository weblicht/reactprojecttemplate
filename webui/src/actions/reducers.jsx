import { jobs } from '../Jobs/reducers';
import { actionType } from '../constants';

import SI from 'seamless-immutable';
import { combineReducers } from 'redux';

function apiinfo(state = SI({}), action) {
    switch (action.type) {
        case actionType.APIINFO_FETCH_SUCCESS:
            return SI(action.info);
        default:
            return state;
    }
}

function alerts(state = SI([]), action) {
    switch (action.type) {
        case actionType.ERROR:
            let mutable = state.asMutable();
            mutable.push(action.message);
            return SI(mutable);
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    apiinfo,
    jobs,
    alerts
});

export default rootReducer;
