// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import {
        generateMethodLogs,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const getBuildLogs = generateMethodLogs('getBuild');


const getBuild = async (
    input: any,
    context: Context,
) => {
    // #region context unpack
    const {
        request,
        builds,

        privateUsage,
        privateOwnerIdentonym,

        customLogicUsage,

        logger,
        logLevels,
    } = context;
    // #endregion context unpack


    // #region log start
    logger.log(
        getBuildLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region input unpack
        const {
            id,
        } = input;
        // #endregion input unpack


        const build = builds.find(build => build.id === id);


        // #region private usage
        if (privateUsage) {
            logger.log(
                '[Performer Info : Handle] :: getBuild · privateUsage',
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    '[Performer Info : End] :: getBuild · privateUsage',
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                '[Performer Info : Success] :: getBuild · privateUsage',
                logLevels.info,
            );

            return {
                status: true,
                data: build,
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.performerLogic;

        if (customLogicUsage && logic) {
            logger.log(
                '[Performer Info : Handle] :: getBuild · customLogicUsage',
                logLevels.trace,
            );

            const build = await logic.builds.getByID(id);

            if (!build) {
                logger.log(
                    '[Performer Info : End] :: getBuild · customLogicUsage',
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                '[Performer Info : Success] :: getBuild · customLogicUsage',
                logLevels.info,
            );

            return {
                status: true,
                data: build,
            };
        }
        // #endregion logic usage


        if (!build) {
            logger.log(
                '[Performer Info : End] :: getBuild',
                logLevels.info,
            );

            return {
                status: false,
            };
        }


        // #region log success
        logger.log(
            '[Performer Info : Success] :: getBuild',
            logLevels.info,
        );
        // #endregion log success


        // #region public usage
        return {
            status: true,
            data: build,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            getBuildLogs.errorEnd,
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
export default getBuild;
// #endregion exports
