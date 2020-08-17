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


export const SET_VIEW_OWNER_ID = 'SET_VIEW_OWNER_ID';
export interface SetViewOwnerIDAction {
    type: typeof SET_VIEW_OWNER_ID;
    payload: string;
}


export const SET_VIEW_USAGE_TYPE = 'SET_VIEW_USAGE_TYPE';
export interface SetViewUsageTypeAction {
    type: typeof SET_VIEW_USAGE_TYPE;
    payload: string;
}



export interface State {
    loading: boolean;
    indexGeneralSelector: string;
    indexGeneralView: string;
    compactSelectors: boolean;
    ownerID: string;
    usageType: string;
}


export type Actions =
    | SetViewLoadingAction
    | SetViewTypeAction
    | SetViewCompactSelectorsAction
    | SetViewOwnerIDAction
    | SetViewUsageTypeAction;
// #endregion module
