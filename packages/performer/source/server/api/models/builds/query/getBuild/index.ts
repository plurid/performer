// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const getBuild = async (
    input: any,
    context: Context,
) => {
    // #region context unpack
    const {
        builds,
        privateUsage,
        privateOwnerIdentonym,

        logger,
        logLevels,
    } = context;
    // #endregion context unpack


    // #region log start
    logger.log(
        '[Performer Info : Start] :: getBuild',
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage && !privateOwnerIdentonym) {
            return {
                status: false,
            };
        }
        // #endregion private usage


        // #region logic usage

        // #endregion logic usage


        const {
            id,
        } = input;

        const build = builds.find(build => build.id === id);

        if (!build) {
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
            '[Performer Error : End] :: getBuild',
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
