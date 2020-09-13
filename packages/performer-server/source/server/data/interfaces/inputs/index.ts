// #region imports
    // #region external
    import {
        CodeProvider,
    } from '../general';
    // #endregion external
// #endregion imports



// #region module
export interface InputOf<T> {
    input: T;
}


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


export interface InputLinkRepository {
    providerID: string;
    nameWithOwner: string;
}


export interface InputSetupWebhook {
    providerID: string;
    path: string;
}

export interface InputUpdateWebhook {
    id: string;
    providerID: string;
    path: string;
}


export interface InputStoreSecret {
    name: string,
    value: string,
    project: string,
}


export interface InputGenerateTrigger {
    id?: string,
    name: string,
    repository: string,
    branch: string,
    path: string,
    file: string,
    project: string,
}


export interface InputGenerateDeployer {
    id?: string,
    name: string,
    repository: string,
    branch: string,
    path: string,
    file: string,
    project: string,
}


export interface InputSetupNotifier {
}

export interface InputUpdateNotifier {
}
// #endregion module
