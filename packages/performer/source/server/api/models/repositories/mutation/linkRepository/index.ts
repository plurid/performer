// #region imports
    // #region external
    import {
        Context,
        InputLinkRepository,
    } from '#server/data/interfaces';

    import {
        getRepository,
        getRepositoryDataByNameWithOwner,
    } from '#server/api/requesters';

    import {
        registerRepositoryMetadata,
    } from '#server/logic/repository';

    import {
        generateMethodLogs,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const linkRepositoryLogs = generateMethodLogs('linkRepository');


export const handleLinkRepository = async (
    input: InputLinkRepository,
) => {
    const {
        providerID,
        nameWithOwner,
    } = input;

    const repositoryData = await getRepositoryDataByNameWithOwner(
        providerID,
        nameWithOwner,
    );
    console.log('repositoryData', repositoryData);

    if (!repositoryData) {
        return {
            status: false,
        };
    }

    const {
        name,
    } = repositoryData;

    if (!name) {
        return {
            status: false,
        };
    }

    await getRepository(
        providerID,
        name,
    );

    await registerRepositoryMetadata(
        repositoryData,
    );

    return {
        status: true,
    };
}

const linkRepository = async (
    input: InputLinkRepository,
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
        linkRepositoryLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                linkRepositoryLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    linkRepositoryLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            await handleLinkRepository(
                input,
            );

            logger.log(
                linkRepositoryLogs.infoSuccessPrivateUsage,
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
                linkRepositoryLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            // await handleLinkRepository(
            //     input,
            // );

            logger.log(
                linkRepositoryLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
            };
        }
        // #endregion logic usage


        // #region public usage
        await handleLinkRepository(
            input,
        );

        logger.log(
            linkRepositoryLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            linkRepositoryLogs.errorEnd,
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
export default linkRepository;
// #endregion exports
