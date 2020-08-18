// #region imports
    // #region external
    import {
        Context,
        InputAddProvider,
    } from '#server/data/interfaces';

    import {
        registerProvider,
    } from '#server/logic/provider';
    // #endregion external
// #endregion imports



// #region module
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
        '[Performer Info : Start] :: addProvider',
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                '[Performer Info : Handle] :: addProvider · privateUsage',
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    '[Performer Info : End] :: addProvider · privateUsage',
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
                '[Performer Info : Success] :: addProvider · privateUsage',
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
                '[Performer Info : Handle] :: addProvider · customLogicUsage',
                logLevels.trace,
            );

            const provider = await logic.provider.register(
                input,
            );

            if (!provider) {
                logger.log(
                    '[Performer Info : End] :: addProvider · customLogicUsage',
                    logLevels.trace,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                '[Performer Info : End] :: addProvider · customLogicUsage',
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
            '[Performer Info : Success] :: addProvider',
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
            '[Performer Error : End] :: addProvider',
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
