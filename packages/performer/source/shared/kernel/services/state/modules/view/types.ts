export const SET_VIEW_LOADING = 'SET_VIEW_LOADING';
export interface SetViewLoadingAction {
    type: typeof SET_VIEW_LOADING;
    payload: boolean;
}



export interface State {
    loading: boolean;
}


export type Actions =
    | SetViewLoadingAction;
