// #region imports
    // #region external
    import {
        PerformerOwner,
        OwnerToken,

        Provider,
        Build,
    } from '../general';

    import {
        Logger,
    } from '../logger';

    import {
        InputAddProvider,
    } from '../inputs';
    // #endregion external
// #endregion imports



// #region module
export interface PerformerLogicProvider {
    register: (
        input: InputAddProvider,
    ) => Promise<Provider | undefined>;
    deregister: (
        id: string,
    ) => Promise<boolean>;
}

export interface PerformerLogicBuilds {
    clear: () => Promise<boolean>;
    getByID: (
        id: string,
    ) => Promise<Build | undefined>;
    getBuildLog: (
        id: string,
    ) => Promise<any | undefined>;
}

export interface PerformerLogic {
    getCurrentOwner: () => Promise<PerformerOwner>;
    checkOwnerToken: (
        token: string,
    ) => Promise<boolean>;
    getOwnerToken: (
        identonym: string,
        key: string,
    ) => Promise<OwnerToken>;
    logger: Logger;

    provider: PerformerLogicProvider;
    builds: PerformerLogicBuilds;
}
// #endregion module
