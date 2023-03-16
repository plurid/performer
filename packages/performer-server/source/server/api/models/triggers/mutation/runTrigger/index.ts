// #region imports
    // #region external
    import {
        Context,
        InputRunTrigger,
    } from '~server/data/interfaces';

    import {
        getTrigger,
        handleTrigger,
    } from '~server/logic/triggers';

    import {
        getProject,
    } from '~server/logic/projects';

    import {
        getActiveRepository,
        getLastCommitID,
    } from '~server/logic/repository';

    import {
        getProvider,
    } from '~server/logic/provider';

    import {
        generateMethodLogs,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const runTriggerLogs = generateMethodLogs('runTrigger');


const runTrigger = async (
    input: InputRunTrigger,
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
        runTriggerLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                runTriggerLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    runTriggerLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }


            const trigger = await getTrigger(input.id);
            if (!trigger) {
                return {
                    status: false,
                };
            }

            const repository = await getActiveRepository(trigger.repository);
            if (!repository) {
                return {
                    status: false,
                };
            }

            const provider = await getProvider(repository.providerID);
            if (!provider) {
                return {
                    status: false,
                };
            }

            const lastCommitID = await getLastCommitID(
                repository.name,
                provider.type,
            );
            if (!lastCommitID) {
                return {
                    status: false,
                };
            }

            console.log({
                trigger,
                repository,
                provider,
            });

            await handleTrigger(
                {
                    id: lastCommitID,
                    added: [],
                    modified: [],
                    removed: [],
                },
                trigger,
                trigger.repository,
                trigger.branch,
                provider.type,
            );

            logger.log(
                runTriggerLogs.infoSuccessPrivateUsage,
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
                runTriggerLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );


            logger.log(
                runTriggerLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
            };
        }
        // #endregion logic usage


        // #region public usage
        logger.log(
            runTriggerLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            runTriggerLogs.errorEnd,
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
export default runTrigger;
// #endregion exports
