function createReducer({initialState = {}, actionHandlers = {}}) {
    return function reducer(state = initialState, action) {
        if (!action.type || !action.payload) {
            return state;
        }

        const actionHandler = actionHandlers[action.type];

        return actionHandler ? actionHandler({state, action}) : state;
    };
}

export default createReducer;
