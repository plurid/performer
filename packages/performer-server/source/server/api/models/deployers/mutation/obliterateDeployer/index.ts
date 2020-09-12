// #region imports
    // #region external
    import {
        Context,
        InputValueString,
    } from '#server/data/interfaces';

    import {
        inputCall,
    } from '#server/api/metas';

    import {
        deregisterDeployer,
    } from '#server/logic/deployers';

    import {
        generateMethodLogs,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const obliterateDeployerLogs = generateMethodLogs('obliterateDeployer');


const obliterateDeployer = async (
    input: InputValueString,
    context: Context,
) => {
    // return inputCall(
    //     input,
    //     context,
    //     deregisterDeployer,
    //     obliterateDeployerLogs,
    // );



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
        obliterateDeployerLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                obliterateDeployerLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    obliterateDeployerLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            await deregisterDeployer(input);

            logger.log(
                obliterateDeployerLogs.infoSuccessPrivateUsage,
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
                obliterateDeployerLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            await deregisterDeployer(input);

            logger.log(
                obliterateDeployerLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
            };
        }
        // #endregion logic usage


        // #region public usage
        await deregisterDeployer(input);

        logger.log(
            obliterateDeployerLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            obliterateDeployerLogs.errorEnd,
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
export default obliterateDeployer;
// #endregion exports
