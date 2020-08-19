// #region imports
    // #region external
    import {
        Context,
        InputGenerateTrigger,
    } from '#server/data/interfaces';

    import {
        registerTrigger,
    } from '#server/logic/triggers';

    import {
        generateMethodLogs,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const generateTriggerLogs = generateMethodLogs('generateTrigger');


const generateTrigger = async (
    input: InputGenerateTrigger,
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
        generateTriggerLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                generateTriggerLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    generateTriggerLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            await registerTrigger(input);

            logger.log(
                generateTriggerLogs.infoSuccessPrivateUsage,
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
                generateTriggerLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            await registerTrigger(input);

            logger.log(
                generateTriggerLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
            };
        }
        // #endregion logic usage


        // #region public usage
        await registerTrigger(input);

        logger.log(
            generateTriggerLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            generateTriggerLogs.errorEnd,
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
export default generateTrigger;
// #endregion exports
