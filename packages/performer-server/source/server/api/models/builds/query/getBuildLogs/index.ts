// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import {
        getBuildLogs as getBuildLogsLogic,
    } from '~server/logic/buildLogs';

    import {
        generateMethodLogs,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const getBuildLogsLogs = generateMethodLogs('getBuildLogs');

const getBuildLogs = async (
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


    try {
        // #region input unpack
        const {
            value,
        } = input;
        // #endregion input unpack


        const build = builds.find(build => build.id === value);

        if (!build) {
            return {
                status: false,
            };
        }

        const {
            stages,
        } = build;

        const results = await getBuildLogsLogic(
            value,
            stages,
        );


        // #region private usage
        if (privateUsage) {
            logger.log(
                '[Performer Info : Handle] :: getBuildLogs · privateUsage',
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    '[Performer Info : End] :: getBuildLogs · privateUsage',
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                '[Performer Info : Success] :: getBuildLogs · privateUsage',
                logLevels.info,
            );

            return {
                status: true,
                data: {
                    build,
                    results,
                },
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.performerLogic;

        if (customLogicUsage && logic) {
            logger.log(
                '[Performer Info : Handle] :: getBuildLogs · customLogicUsage',
                logLevels.trace,
            );

            const build = await logic.builds.getByID(value);
            const results = await logic.builds.getBuildLog(value);

            if (!build) {
                logger.log(
                    '[Performer Info : End] :: getBuildLogs · customLogicUsage',
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                '[Performer Info : Success] :: getBuildLogs · customLogicUsage',
                logLevels.info,
            );

            return {
                status: true,
                data: {
                    build,
                    results,
                },
            };
        }
        // #endregion logic usage


        // #region log success
        logger.log(
            '[Performer Info : Success] :: getBuildLogs',
            logLevels.info,
        );
        // #endregion log success


        // #region public usage
        return {
            status: true,
            data: {
                build,
                results,
            },
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            '[Performer Error : End] :: getBuildLogs',
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
export default getBuildLogs;
// #endregion exports
