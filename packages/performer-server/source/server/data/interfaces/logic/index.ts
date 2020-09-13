// #region imports
    // #region external
    import {
        PerformerOwner,
        OwnerToken,

        Provider,
        Imagene,
        Build,
    } from '../general';

    import {
        Notifier,
    } from '../notifier';

    import {
        Logger,
    } from '../logger';

    import {
        InputValueString,

        InputAddProvider,
        InputAddImagene,

        InputSetupNotifier,
    } from '../inputs';
    // #endregion external
// #endregion imports



// #region module
export interface PerformerLogicProvider {
    register: (
        input: InputAddProvider,
    ) => Promise<Provider | undefined>;
    deregister: (
        input: InputValueString,
    ) => Promise<boolean>;
}


export interface PerformerLogicImagene {
    register: (
        input: InputAddImagene,
    ) => Promise<Imagene | undefined>;
    deregister: (
        id: string,
    ) => Promise<boolean>;
}


export interface PerformerLogicNotifier {
    register: (
        input: InputSetupNotifier,
    ) => Promise<Notifier | undefined>;
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
    imagene: PerformerLogicImagene;
    notifier: PerformerLogicNotifier;
    builds: PerformerLogicBuilds;
}
// #endregion module
