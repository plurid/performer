// #region imports
    // #region external
    import {
        Context,
        InputSetupNotifier,
    } from '~server/data/interfaces';

    import {
        registerNotifier,
    } from '~server/logic/notifier';

    import {
        generateMethodLogs,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const setupNotifierLogs = generateMethodLogs('setupNotifier');

const setupNotifier = async (
    input: InputSetupNotifier,
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
        setupNotifierLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                setupNotifierLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    setupNotifierLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            const notifier = await registerNotifier(
                input,
            );

            logger.log(
                setupNotifierLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: notifier.id,
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.performerLogic;

        if (customLogicUsage && logic) {
            logger.log(
                setupNotifierLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            const notifier = await logic.notifier.register(
                input,
            );

            if (!notifier) {
                logger.log(
                    setupNotifierLogs.infoEndCustomLogicUsage,
                    logLevels.trace,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                setupNotifierLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: notifier.id,
            };
        }
        // #endregion logic usage


        // #region public usage
        const notifier = await registerNotifier(
            input,
        );

        logger.log(
            setupNotifierLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
            data: notifier.id,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            setupNotifierLogs.errorEnd,
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
export default setupNotifier;
// #endregion exports
