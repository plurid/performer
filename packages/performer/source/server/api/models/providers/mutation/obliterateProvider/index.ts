// #region imports
    // #region external
    import {
        Context,
        InputValueString,
    } from '#server/data/interfaces';

    import {
        deregisterProvider,
    } from '#server/logic/provider';
    // #endregion external
// #endregion imports



// #region module
const obliterateProvider = async (
    input: InputValueString,
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
        '[Performer Info : Start] :: obliterateProvider',
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region input unpack
        const {
            value: id,
        } = input;
        // #endregion input unpack


        // #region private usage
        if (privateUsage) {
            logger.log(
                '[Performer Info : Handle] :: obliterateProvider · privateUsage',
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    '[Performer Info : End] :: obliterateProvider · privateUsage',
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            await deregisterProvider(id);

            logger.log(
                '[Performer Info : Success] :: obliterateProvider · privateUsage',
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
                '[Performer Info : Handle] :: obliterateProvider · customLogicUsage',
                logLevels.trace,
            );

            await logic.provider.deregister(
                id,
            );

            logger.log(
                '[Performer Info : End] :: obliterateProvider · customLogicUsage',
                logLevels.info,
            );

            return {
                status: true,
            };
        }
        // #endregion logic usage


        // #region public usage
        await deregisterProvider(
            id,
        );

        logger.log(
            '[Performer Info : Success] :: obliterateProvider',
            logLevels.info,
        );

        return {
            status: true,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            '[Performer Error : End] :: obliterateProvider',
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
export default obliterateProvider;
// #endregion exports
