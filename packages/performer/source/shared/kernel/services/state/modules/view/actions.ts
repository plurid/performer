import * as Types from './types';



export const setViewLoading = (
    payload: boolean,
): Types.SetViewLoadingAction => {
    return {
        type: Types.SET_VIEW_LOADING,
        payload,
    };
}



export const actions = {
    setViewLoading,
};
