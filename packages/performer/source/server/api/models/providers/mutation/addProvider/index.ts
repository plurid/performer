// #region imports
    // #region external
    import {
        Context,
        InputAddProvider,
    } from '#server/data/interfaces';

    import {
        registerProvider,
    } from '#server/logic/provider';

    import {
        generateLog,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const addProviderLogs = {
    infoStart: generateLog('Info', 'Start', 'addProvider'),
    infoSuccess: generateLog('Info', 'Success', 'addProvider'),
    infoEnd: generateLog('Info', 'End', 'addProvider'),

    infoHandlePrivateUsage: generateLog('Info', 'Handle', 'addProvider', 'privateUsage'),
    infoEndPrivateUsage: generateLog('Info', 'End', 'addProvider', 'privateUsage'),
    infoSuccessPrivateUsage: generateLog('Info', 'Success', 'addProvider', 'privateUsage'),

    infoHandleCustomLogicUsage: generateLog('Info', 'Handle', 'addProvider', 'customLogicUsage'),
    infoEndCustomLogicUsage: generateLog('Info', 'End', 'addProvider', 'customLogicUsage'),
    infoSuccessCustomLogicUsage: generateLog('Info', 'Success', 'addProvider', 'customLogicUsage'),
};


const addProvider = async (
    input: InputAddProvider,
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
        addProviderLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                addProviderLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    addProviderLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            const provider = await registerProvider(
                input,
            );

            logger.log(
                addProviderLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: provider.id,
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.performerLogic;

        if (customLogicUsage && logic) {
            logger.log(
                addProviderLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            const provider = await logic.provider.register(
                input,
            );

            if (!provider) {
                logger.log(
                    addProviderLogs.infoEndCustomLogicUsage,
                    logLevels.trace,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                addProviderLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: provider.id,
            };
        }
        // #endregion logic usage


        // #region public usage
        const provider = await registerProvider(
            input,
        );

        logger.log(
            addProviderLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
            data: provider.id,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            addProviderLogs.infoEnd,
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
export default addProvider;
// #endregion exports
