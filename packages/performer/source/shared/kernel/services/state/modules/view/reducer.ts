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
        case Types.SET_VIEW_LOADING:
            return resolvers.setViewLoading(state, action);
        case Types.SET_VIEW_TYPE:
            return resolvers.setViewType(state, action);
        default:
            return {
                ...state,
            };
    }
}
