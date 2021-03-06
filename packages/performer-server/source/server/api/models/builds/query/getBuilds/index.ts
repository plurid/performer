// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import {
        generateMethodLogs,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const getBuildsLogs = generateMethodLogs('getBuilds');


const getBuilds = async (
    context: Context,
) => {
    // #region unpack context
    const {
        request,
        builds,

        privateUsage,
        privateOwnerIdentonym,

        customLogicUsage,

        logger,
        logLevels,
    } = context;
    // #endregion unpack context


    try {
        // #region private usage
        if (privateUsage) {
            if (!privateOwnerIdentonym) {
                return {
                    status: false,
                };
            }

            return {
                status: true,
                data: builds,
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.performerLogic;

        if (logic) {
            const owner = await logic.getCurrentOwner();

            return {
                status: true,
                data: owner.builds,
            };
        }
        // #endregion logic usage


        // #region public usage
        return {
            status: true,
            data: builds,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            '[Performer Error : End] :: getBuilds',
            logLevels.error,
            error,
        );

        return {
            status: false,
        };
        // #endregion error handle
    }
}
// #endregion module



// #region exports
export default getBuilds;
// #endregion exports
