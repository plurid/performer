// #region imports
    // #region external
    import {
        Context,
        InputUpdateNotifier,
    } from '#server/data/interfaces';

    import {
        updateNotifier as updateNotifierLogic,
    } from '#server/logic/notifier';

    import {
        generateMethodLogs,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const updateNotifierLogs = generateMethodLogs('updateNotifier');


const updateNotifier = async (
    input: InputUpdateNotifier,
    context: Context,
) => {
    // #region context unpack
    const {
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
        updateNotifierLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                updateNotifierLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    updateNotifierLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            const notifier = await updateNotifierLogic(
                input,
            );

            if (!notifier) {
                logger.log(
                    updateNotifierLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                updateNotifierLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: notifier,
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.performerLogic;

        if (customLogicUsage && logic) {
            logger.log(
                updateNotifierLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            const notifier = await updateNotifierLogic(
                input,
            );

            if (!notifier) {
                logger.log(
                    updateNotifierLogs.infoEndCustomLogicUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                updateNotifierLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: notifier,
            };
        }
        // #endregion logic usage


        // #region public usage
        const notifier = await updateNotifierLogic(
            input,
        );

        if (!notifier) {
            logger.log(
                updateNotifierLogs.infoEnd,
                logLevels.info,
            );

            return {
                status: false,
            };
        }

        logger.log(
            updateNotifierLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
            data: notifier,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            updateNotifierLogs.errorEnd,
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
export default updateNotifier;
// #endregion exports
