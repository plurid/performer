// #region imports
    // #region external
    import {
        Context,
        InputValueString,
    } from '#server/data/interfaces';

    import {
        deregisterImagene,
    } from '#server/logic/imagene';

    import {
        generateMethodLogs,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const obliterateImageneLogs = generateMethodLogs('obliterateImagene');

const obliterateImagene = async (
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
        obliterateImageneLogs.infoStart,
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
                obliterateImageneLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    obliterateImageneLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            await deregisterImagene(id);

            logger.log(
                obliterateImageneLogs.infoSuccessPrivateUsage,
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
                obliterateImageneLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            await logic.provider.deregister(
                id,
            );

            logger.log(
                obliterateImageneLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
            };
        }
        // #endregion logic usage


        // #region public usage
        await deregisterImagene(
            id,
        );

        logger.log(
            obliterateImageneLogs.infoSuccessCustomLogicUsage,
            logLevels.info,
        );

        return {
            status: true,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            obliterateImageneLogs.errorEnd,
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
export default obliterateImagene;
// #endregion exports
