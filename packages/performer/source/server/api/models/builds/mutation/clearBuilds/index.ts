// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const clearBuilds = async (
    context: Context,
) => {
    // #region context unpack
    const {
        request,
        customLogicUsage,
        privateUsage,
        privateOwnerIdentonym,
        logger,
        logLevels,
    } = context;
    // #endregion context unpack


    // #region log start
    logger.log(
        '[Performer Start] :: clearBuilds',
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage && !privateOwnerIdentonym) {
            return {
                status: false,
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.performerLogic;

        if (customLogicUsage && logic) {
            logger.log(
                '[Performer Handle] :: clearBuilds · customLogicUsage',
                logLevels.trace,
            );

            await logic.builds.clear();

            logger.log(
                '[Performer End] :: clearBuilds · customLogicUsage',
                logLevels.info,
            );

            return {
                status: true,
            };
        }
        // #endregion logic usage


        // #region log end
        logger.log(
            '[Performer End] :: clearBuilds',
            logLevels.info,
        );
        // #endregion log end


        // #region public usage
        return {
            status: true,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            '[Performer Error] :: clearBuilds',
            logLevels.error,
        );

        return {
            status: false,
        };
        // #endregion error handle
    }
}
// #endregion module



// #region exports
export default clearBuilds;
// #endregion exports
