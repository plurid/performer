// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        PerformerLogic,
    } from '#server/data/interfaces';

    import Logger from '#server/logic/logger';
    // #endregion external
// #endregion imports



// #region module
const performerLogic: PerformerLogic = {
    getCurrentOwner: async () => {
        return {
            id: uuid.generate(),
            providers: [],
            imagenes: [],
            repositories: [],
            webhooks: [],
            projects: [],
            secrets: [],
            triggers: [],
            deployers: [],
            builds: [],
            deploys: [],
        };
    },
    checkOwnerToken: async (
        token: string,
    ) => {
        if (!token) {
            return false;
        }

        return true;
    },
    getOwnerToken: async (
        identonym,
        key,
    ) => {
        return {
            token: 'owner-token',
        };
    },

    builds: {
        clear: async () => {
            return true;
        },
    },

    logger: new Logger(),
};
// #endregion module



// #region exports
export default performerLogic;
// #endregion exports
