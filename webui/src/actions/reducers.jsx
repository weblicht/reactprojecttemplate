import SI from 'seamless-immutable';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { actionType } from '../constants';

function apiinfo(state = SI({}), action) {
    switch (action.type) {
        case actionType.APIINFO_FETCH_SUCCESS:
            return SI(action.info);
        default:
            return state;
    }
}

function jobs(state = SI({}), action) {
    switch (action.type) {
        case actionType.JOB_SUBMITTED:
            return SI.set(state, action.job.id, SI(action.job));
        default:
            return state;
    }
}

function alerts(state = SI([]), action) {
    switch (action.type) {
        case actionType.ERROR:
            return SI.push(state, action.message);
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    apiinfo,
    jobs,
    alerts,
    form: formReducer,
    routing: routerReducer
});

export default rootReducer;
