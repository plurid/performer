// #region imports
    // #region external
    import {
        Context,
        InputStoreSecret,
    } from '~server/data/interfaces';

    import {
        registerSecret,
    } from '~server/logic/secrets';

    import {
        generateMethodLogs,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const storeSecretLogs = generateMethodLogs('storeSecret');


const storeSecret = async (
    input: InputStoreSecret,
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
        storeSecretLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                storeSecretLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    storeSecretLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            const secret = await registerSecret(input);

            logger.log(
                storeSecretLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: secret,
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.performerLogic;

        if (customLogicUsage && logic) {
            logger.log(
                storeSecretLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            const secret = await registerSecret(input);

            logger.log(
                storeSecretLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: secret,
            };
        }
        // #endregion logic usage


        // #region public usage
        const secret = await registerSecret(input);

        logger.log(
            storeSecretLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
            data: secret,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            storeSecretLogs.errorEnd,
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
export default storeSecret;
// #endregion exports
