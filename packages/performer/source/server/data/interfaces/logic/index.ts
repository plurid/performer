// #region imports
    // #region external
    import {
        PerformerOwner,
        OwnerToken,

        Build,
    } from '../general';

    import {
        Logger,
    } from '../logger';
    // #endregion external
// #endregion imports



// #region module
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
    builds: PerformerLogicBuilds;
    logger: Logger;
}
// #endregion module
