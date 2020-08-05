import * as Types from './types';



export const setViewLoading = (
    state: Types.State,
    action: Types.SetViewLoadingAction,
): Types.State => {

    return {
        ...state,
        loading: action.payload,
    };
}



export const resolvers = {
    setViewLoading,
};
