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


export const setViewType = (
    state: Types.State,
    action: Types.SetViewTypeAction,
): Types.State => {
    const {
        type,
        value,
    } = action.payload;

    switch (type) {
        case 'indexGeneralSelector':
            return {
                ...state,
                indexGeneralSelector: value,
            };
        case 'indexGeneralView':
            return {
                ...state,
                indexGeneralView: value,
            };
        default:
            return {
                ...state,
            };
    }
}



export const resolvers = {
    setViewLoading,
    setViewType,
};
