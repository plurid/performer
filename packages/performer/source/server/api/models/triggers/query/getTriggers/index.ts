// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        generateMethodLogs,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const getTriggersLogs = generateMethodLogs('getTriggers');


const getTriggers = async (
    context: Context,
) => {
    // #region context unpack
    const {
        triggers,
        request,

        privateUsage,
        privateOwnerIdentonym,

        customLogicUsage,

        logger,
        logLevels,
    } = context;
    // #endregion context unpack


    // #region log start
    logger.log(
        getTriggersLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                getTriggersLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    getTriggersLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                getTriggersLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: [
                    ...triggers,
                ],
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.performerLogic;

        if (customLogicUsage && logic) {
            logger.log(
                getTriggersLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            const owner = await logic.getCurrentOwner();

            return {
                status: true,
                data: [
                    ...owner.projects,
                ],
            };
        }
        // #endregion logic usage


        // #region public usage
        logger.log(
            getTriggersLogs.infoSuccessCustomLogicUsage,
            logLevels.info,
        );

        return {
            status: true,
            data: [
                ...triggers,
            ],
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            getTriggersLogs.errorEnd,
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
export default getTriggers;
// #endregion exports
