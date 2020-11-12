// #region imports
    // #region libraries
    import {
        workerData,
    } from 'worker_threads';
    // #endregion libraries


    // #region external
    import {
        logLevels,
    } from '#server/data/constants';

    import {
        triggerBuild,
    } from '../build/triggerBuild';

    import logger from '#server/services/logger';
    // #endregion external
// #endregion imports



// #region module
const main = async () => {
    try {
        logger.log(
            'performer :: triggerBuild worker started',
            logLevels.trace,
        );

        await triggerBuild(
            workerData.data,
        );

        logger.log(
            'performer :: triggerBuild worker finished',
            logLevels.trace,
        );

        return;
    } catch (error) {
        logger.log(
            'performer :: triggerBuild worker errored',
            logLevels.trace,
            error,
        );

        return;
    }
}

main();
// #endregion module
