// #region imports
    // #region external
    import {
        logLevels,
    } from '~server/data/constants';

    import {
        cleanDockerImages,
    } from '../commands/utilities';

    import logger from '~server/services/logger';
    // #endregion external
// #endregion imports



// #region module
const main = async () => {
    try {
        logger.log(
            'performer :: cleanDockerImages worker started',
            logLevels.trace,
        );

        await cleanDockerImages();

        logger.log(
            'performer :: cleanDockerImages worker finished',
            logLevels.trace,
        );

        return;
    } catch (error) {
        logger.log(
            'performer :: cleanDockerImages worker errored',
            logLevels.trace,
            error,
        );

        return;
    }
}

main();
// #endregion module
