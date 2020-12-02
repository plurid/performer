// #region imports
    // #region external
    import {
        Context,
        InputAddImagene,
    } from '~server/data/interfaces';

    import {
        registerImagene,
    } from '~server/logic/imagene';

    import {
        generateMethodLogs,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const addImageneLogs = generateMethodLogs('addImagene');

const addImagene = async (
    input: InputAddImagene,
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
        addImageneLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                addImageneLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    addImageneLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            const imagene = await registerImagene(
                input,
            );

            logger.log(
                addImageneLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: imagene.id,
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.performerLogic;

        if (customLogicUsage && logic) {
            logger.log(
                addImageneLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            const imagene = await logic.imagene.register(
                input,
            );

            if (!imagene) {
                logger.log(
                    addImageneLogs.infoEndCustomLogicUsage,
                    logLevels.trace,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                addImageneLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: imagene.id,
            };
        }
        // #endregion logic usage


        // #region public usage
        const imagene = await registerImagene(
            input,
        );

        logger.log(
            addImageneLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
            data: imagene.id,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            addImageneLogs.errorEnd,
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
export default addImagene;
// #endregion exports
