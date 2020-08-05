export const SET_VIEW_LOADING = 'SET_VIEW_LOADING';
export interface SetViewLoadingAction {
    type: typeof SET_VIEW_LOADING;
    payload: boolean;
}


export const SET_VIEW_TYPE = 'SET_VIEW_TYPE';

export interface SetViewTypePayload {
    type: 'indexGeneralSelector' | 'indexGeneralView';
    value: string;
}

export interface SetViewTypeAction {
    type: typeof SET_VIEW_TYPE;
    payload: SetViewTypePayload;
}



export interface State {
    loading: boolean;
    indexGeneralSelector: string;
    indexGeneralView: string;
}


export type Actions =
    | SetViewLoadingAction
    | SetViewTypeAction;
