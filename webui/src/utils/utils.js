// actionTypesFromStrings :: [ String ] -> Object
// Given an array of strings, returns an object using those strings as field names.
// This object can be used to represent a set of action types.
export function actionTypesFromStrings (strs) {
    var types = {};
    strs.forEach(function(key) {
        types[key] = key;
    });

    return types;
}
    }
    return a;
}

export function toPairs(o) {
    var a = []
    for (var k in o) {
        if (o.hasOwnProperty(k)) {
            a.push([k, o[k]]);
// makeByIdReducer
//
// Creates a reducer that can manage the state for a dynamic list of
// components based on their IDs.  That is, given a reducer which
// manages state that looks like { foo: fooVal, ...}, this
// function creates a reducer which manages state that looks like:
// { byId: {
//      idA: { foo: fooVal, ... },
//      idB: { foo: fooVal, ... },
//      ...
//   }
// }
//           
// The returned reducer assumes that IDs are unique within the state
// tree that it manages, and that an .id field is included on all of
// the actions it handles.  Based on that .id, it routes the
// corresponding slice of state to the given reducer (first
// initializing it if necessary), and updates the state tree with the
// return value.  Thus, the given reducer is called *exactly once* per
// action handled.
//
// Parameters:
//   innerReducer: reducer function that manages internal slices of state 
//   innerActions: an action types object that specifies the action types the
//     innerReducer can handle. Important: these actions are *required* to have
//     an .id field whenever they are emitted!
//   initialSharedState (optional): a Seamless Immutable object that represents
//     an initial state tree for the returned reducer to manage.  The byId object
//     will become a property of this object.
//     
export function makeByIdReducer(innerReducer,
                                innerActions,
                                initialSharedState = SI({})) {
    return function (state = initialSharedState, action) {
        const componentId = action.id;
        var initializedState = state;

        // any actions other than those in innerActions are not
        // handled by us and should return the original state
        // unchanged:
        if (!(action.type in innerActions)) {
            return state;
        }

        if (componentId === undefined) {
            throw new InternalError(`${action.type} was emitted with an undefined .id`);
        }
        
        // initialize a slice of state corresponding to the given
        // ID if it doesn't yet exist
        if ((state.byId === undefined) ||
            !(componentId in state.byId)) {
            // redux reducers are required to return a default
            // state if given an undefined state, so we use that to get
            // the default state handled by the inner reducer; see 
            // https://redux.js.org/basics/reducers
            // https://redux.js.org/api/combinereducers
            const defaultInnerState = innerReducer(undefined,
                                                   // dummy action type:
                                                   { type: '_DEFAULT_STATE_PROBE' }); 
            
            initializedState = SI.setIn(state, ['byId', componentId],
                                        defaultInnerState);
        }
            
        // pass the appropriate slice of the initialized state on
        // to the innerReducer, and let it handle the action
        const oldInnerState = initializedState.byId[componentId];
        return SI.setIn(initializedState, ['byId', componentId],
                        innerReducer(oldInnerState, action));

    }
}
