import { actionTypes } from './actions';

import SI from 'seamless-immutable';

// TODO: style cleanup.
// TODO: makeByIdReducer
export function jobs(state = SI([]), action) {
    switch (action.type) {
        case actionTypes.JOB_SUBMITTED:
        case actionTypes.JOB_DONE: {
            let mutable = state.asMutable();
            let index = mutable.findIndex(j => j.id == action.job.id);
            if (index >= 0) {
                mutable[index] = action.job;
            } else {
                mutable.push(action.job);
            }
            return SI(mutable);
        }
        case actionTypes.JOB_REMOVE: {
            let mutable = state.asMutable();
            let index = mutable.findIndex(j => j.id == action.job.id);
            if (index >= 0) {
                mutable.splice(index, 1);
            }
            return SI(mutable);
        }
        default:
            return state;
    }
}



