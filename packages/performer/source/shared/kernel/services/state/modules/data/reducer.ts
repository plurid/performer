import * as Types from './types';

import {
    initialState,
} from './initial';

import {
    resolvers,
} from './resolvers';



export const reducer = (
    state: Types.State = initialState,
    action: Types.Actions,
): Types.State => {
    switch(action.type) {
        case Types.SET_REPOSITORIES:
            return resolvers.setRepositories(state, action);
        default:
            return {
                ...state,
            };
    }
}
