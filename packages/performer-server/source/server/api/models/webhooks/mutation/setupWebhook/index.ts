// #region imports
    // #region external
    import {
        Context,
        InputSetupWebhook,
    } from '~server/data/interfaces';

    import {
        handleRegisterWebhook,
        checkValidWebhookPath,
    } from '~server/logic/webhooks';

    import {
        generateMethodLogs,
    } from '~server/utilities';
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
        // #region input unpack
        const {
            path,
        } = input;
        // #endregion input unpack


        // #region checks
        const validWebhookPath = checkValidWebhookPath(path);

        if (!validWebhookPath) {
            return {
                status: false,
            };
        }
        // #endregion checks


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

            const webhook = await handleRegisterWebhook(
                input,
                instance,
            );

            if (!webhook) {
                logger.log(
                    setupWebhookLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                setupWebhookLogs.infoSuccessPrivateUsage,
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
                setupWebhookLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            const webhook = await handleRegisterWebhook(
                input,
                instance,
            );

            if (!webhook) {
                logger.log(
                    setupWebhookLogs.infoEndCustomLogicUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                setupWebhookLogs.infoEndCustomLogicUsage,
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
                setupWebhookLogs.infoEnd,
                logLevels.info,
            );

            return {
                status: false,
            };
        }

        logger.log(
            setupWebhookLogs.infoSuccess,
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
