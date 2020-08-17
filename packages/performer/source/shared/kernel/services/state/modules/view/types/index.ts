// #region imports
    // #region libraries
    // #endregion libraries
// #endregion imports



// #region module
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


export const SET_VIEW_COMPACT_SELECTORS = 'SET_VIEW_COMPACT_SELECTORS';
export interface SetViewCompactSelectorsAction {
    type: typeof SET_VIEW_COMPACT_SELECTORS;
    payload: boolean;
}



export interface State {
    loading: boolean;
    indexGeneralSelector: string;
    indexGeneralView: string;
    compactSelectors: boolean;
}


export type Actions =
    | SetViewLoadingAction
    | SetViewTypeAction
    | SetViewCompactSelectorsAction;
// #endregion module
