// #region imports
    // #region external
    import {
        Context,
        InputGenerateDeployer,
    } from '~server/data/interfaces';

    import {
        inputCall,
    } from '~server/api/metas';

    import {
        registerDeployer,
    } from '~server/logic/deployers';

    import {
        generateMethodLogs,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const generateDeployerLogs = generateMethodLogs('generateDeployer');


const generateDeployer = async (
    input: InputGenerateDeployer,
    context: Context,
) => {
    // return inputCall(
    //     input,
    //     context,
    //     registerDeployer,
    //     generateDeployerLogs,
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
        generateDeployerLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                generateDeployerLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    generateDeployerLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            const deployer = await registerDeployer(input);

            logger.log(
                generateDeployerLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: deployer,
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.performerLogic;

        if (customLogicUsage && logic) {
            logger.log(
                generateDeployerLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            const deployer = await registerDeployer(input);

            logger.log(
                generateDeployerLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: deployer,
            };
        }
        // #endregion logic usage


        // #region public usage
        const deployer = await registerDeployer(input);

        logger.log(
            generateDeployerLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
            data: deployer,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            generateDeployerLogs.errorEnd,
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
export default generateDeployer;
// #endregion exports
