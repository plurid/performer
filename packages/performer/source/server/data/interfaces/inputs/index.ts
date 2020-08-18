// #region imports
    // #region external
    import {
        CodeProvider,
    } from '../general';
    // #endregion external
// #endregion imports



// #region module
export interface InputValueString {
    value: string;
}


export interface InputAddProvider {
    type: CodeProvider;
    token: string;
    name: string;
}
// #endregion module
