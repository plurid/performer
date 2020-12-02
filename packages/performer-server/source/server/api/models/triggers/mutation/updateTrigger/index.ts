// #region imports
    // #region external
    import {
        Context,
        InputGenerateTrigger,
    } from '~server/data/interfaces';

    import {
        registerTrigger,
    } from '~server/logic/triggers';

    import {
        generateMethodLogs,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const updateTriggerLogs = generateMethodLogs('updateTrigger');


const updateTrigger = async (
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
        updateTriggerLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                updateTriggerLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    updateTriggerLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            const trigger = await registerTrigger(input);

            logger.log(
                updateTriggerLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: trigger,
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.performerLogic;

        if (customLogicUsage && logic) {
            logger.log(
                updateTriggerLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            const trigger = await registerTrigger(input);

            logger.log(
                updateTriggerLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: trigger,
            };
        }
        // #endregion logic usage


        // #region public usage
        const trigger = await registerTrigger(input);

        logger.log(
            updateTriggerLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
            data: trigger,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            updateTriggerLogs.errorEnd,
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
export default updateTrigger;
// #endregion exports
