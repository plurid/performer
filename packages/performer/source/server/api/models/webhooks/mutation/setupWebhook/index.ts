// #region imports
    // #region external
    import {
        Context,
        InputSetupWebhook,
    } from '#server/data/interfaces';

    import {
        handleRegisterWebhook,
    } from '#server/logic/webhooks';

    import {
        generateMethodLogs,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const setupWebhookLogs = generateMethodLogs('setupWebhook');

const setupWebhook = async (
    input: InputSetupWebhook,
    context: Context,
) => {
    // #region context unpack
    const {
        request,
        instance,

        privateUsage,
        privateOwnerIdentonym,

        customLogicUsage,

        logger,
        logLevels,
    } = context;
    // #endregion context unpack


    // #region log start
    logger.log(
        setupWebhookLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                setupWebhookLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    setupWebhookLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            await handleRegisterWebhook(
                input,
                instance,
            );

            logger.log(
                setupWebhookLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.performerLogic;

        if (customLogicUsage && logic) {
            logger.log(
                setupWebhookLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            await handleRegisterWebhook(
                input,
                instance,
            );

            logger.log(
                setupWebhookLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
            };
        }
        // #endregion logic usage


        // #region public usage
        await handleRegisterWebhook(
            input,
            instance,
        );

        logger.log(
            setupWebhookLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            setupWebhookLogs.errorEnd,
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
export default setupWebhook;
// #endregion exports
