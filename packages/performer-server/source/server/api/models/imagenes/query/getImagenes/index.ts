// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        generateMethodLogs,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const getImagenesLogs = generateMethodLogs('getImagenes');

const getImagenes = async (
    context: Context,
) => {
    // #region context unpack
    const {
        imagenes,

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
        getImagenesLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                getImagenesLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    getImagenesLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                getImagenesLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: [
                    ...imagenes,
                ],
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.performerLogic;

        if (customLogicUsage && logic) {
            logger.log(
                getImagenesLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            const owner = await logic.getCurrentOwner();

            logger.log(
                getImagenesLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: [
                    ...owner.imagenes,
                ],
            };
        }
        // #endregion logic usage


        // #region public usage
        logger.log(
            getImagenesLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
            data: [
                ...imagenes,
            ],
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            getImagenesLogs.errorEnd,
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
export default getImagenes;
// #endregion exports
