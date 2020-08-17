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
    // #endregion external
// #endregion imports



// #region module
const performerLogic: PerformerLogic = {
    getCurrentOwner: async () => {
        return {
            id: uuid.generate(),
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
};
// #endregion module



// #region exports
export default performerLogic;
// #endregion exports
