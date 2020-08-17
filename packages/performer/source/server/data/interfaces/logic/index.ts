// #region imports
    // #region external
    import {
        PerformerOwner,
        OwnerToken,
    } from '../general';
    // #endregion external
// #endregion imports



// #region module
export interface PerformerLogic {
    getCurrentOwner: () => Promise<PerformerOwner>;
    checkOwnerToken: (
        token: string,
    ) => Promise<boolean>;
    getOwnerToken: (
        identonym: string,
        key: string,
    ) => Promise<OwnerToken>;
}
// #endregion module
