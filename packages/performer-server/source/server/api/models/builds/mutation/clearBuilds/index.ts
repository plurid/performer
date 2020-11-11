// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        clearBuilds as clearBuildsLogic,
    } from '#server/logic/build';

    import {
        generateMethodLogs,
    } from '#server/utilities';

    import delog from '#server/services/delog';
    // #endregion external
// #endregion imports



// #region module
export const clearBuildsLogs = generateMethodLogs('clearBuilds');


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
        clearBuildsLogs.infoStart,
        logLevels.info,
    );
    delog({
        text: clearBuildsLogs.infoStart,
        level: logLevels.info,
    });
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                clearBuildsLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );
            delog({
                text: clearBuildsLogs.infoHandlePrivateUsage,
                level: logLevels.trace,
            });

            if (!privateOwnerIdentonym) {
                logger.log(
                    clearBuildsLogs.infoEndPrivateUsage,
                    logLevels.info,
                );
                delog({
                    text: clearBuildsLogs.infoEndPrivateUsage,
                    level: logLevels.info,
                });

                return {
                    status: false,
                };
            }

            clearBuildsLogic();

            logger.log(
                clearBuildsLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );
            delog({
                text: clearBuildsLogs.infoSuccessPrivateUsage,
                level: logLevels.info,
            });

            return {
                status: true,
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.performerLogic;

        if (customLogicUsage && logic) {
            logger.log(
                clearBuildsLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );
            delog({
                text: clearBuildsLogs.infoHandleCustomLogicUsage,
                level: logLevels.trace,
            });

            await logic.builds.clear();

            logger.log(
                clearBuildsLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );
            delog({
                text: clearBuildsLogs.infoEndCustomLogicUsage,
                level: logLevels.info,
            });

            return {
                status: true,
            };
        }
        // #endregion logic usage


        // #region log success
        await clearBuildsLogic();

        logger.log(
            clearBuildsLogs.infoSuccess,
            logLevels.info,
        );
        delog({
            text: clearBuildsLogs.infoSuccess,
            level: logLevels.info,
        });
        // #endregion log success


        // #region public usage
        return {
            status: true,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            clearBuildsLogs.errorEnd,
            logLevels.error,
            error,
        );
        delog({
            text: clearBuildsLogs.errorEnd,
            level: logLevels.error,
            error,
        });

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
