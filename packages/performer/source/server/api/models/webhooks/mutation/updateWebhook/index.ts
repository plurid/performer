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
export const updateWebhookLogs = generateMethodLogs('updateWebhook');

const updateWebhook = async (
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
        updateWebhookLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                updateWebhookLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    updateWebhookLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            const webhook = await handleRegisterWebhook(
                input,
                instance,
            );

            if (!webhook) {
                logger.log(
                    updateWebhookLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                updateWebhookLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: webhook,
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.performerLogic;

        if (customLogicUsage && logic) {
            logger.log(
                updateWebhookLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            const webhook = await handleRegisterWebhook(
                input,
                instance,
            );

            if (!webhook) {
                logger.log(
                    updateWebhookLogs.infoEndCustomLogicUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                updateWebhookLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: webhook,
            };
        }
        // #endregion logic usage


        // #region public usage
        const webhook = await handleRegisterWebhook(
            input,
            instance,
        );

        if (!webhook) {
            logger.log(
                updateWebhookLogs.infoEnd,
                logLevels.info,
            );

            return {
                status: false,
            };
        }

        logger.log(
            updateWebhookLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
            data: webhook,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            updateWebhookLogs.errorEnd,
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
export default updateWebhook;
// #endregion exports
