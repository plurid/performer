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
export const getDeployersLogs = generateMethodLogs('getDeployers');


const getDeployers = async (
    context: Context,
) => {
    // #region context unpack
    const {
        deployers,
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
        getDeployersLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                getDeployersLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    getDeployersLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                getDeployersLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: [
                    ...deployers,
                ],
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.performerLogic;

        if (customLogicUsage && logic) {
            logger.log(
                getDeployersLogs.infoHandleCustomLogicUsage,
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
            getDeployersLogs.infoSuccessCustomLogicUsage,
            logLevels.info,
        );

        return {
            status: true,
            data: [
                ...deployers,
            ],
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            getDeployersLogs.errorEnd,
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
export default getDeployers;
// #endregion exports
