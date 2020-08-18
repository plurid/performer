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

export interface InputAddImagene {
    name: string;
    version: string;
}
// #endregion module
