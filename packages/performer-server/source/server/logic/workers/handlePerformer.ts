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
        handlePerformer,
    } from '../commands';

    import logger from '#server/services/logger';
    // #endregion external
// #endregion imports



// #region module
const main = async () => {
    try {
        logger.log(
            'performer :: handlePerformer worker started',
            logLevels.trace,
        );

        await handlePerformer(
            workerData.buildData,
            workerData.performerTriggerData,
            workerData.workDirectoryPath,
            workerData.project,
        );

        logger.log(
            'performer :: handlePerformer worker finished',
            logLevels.trace,
        );

        return;
    } catch (error) {
        logger.log(
            'performer :: handlePerformer worker errored',
            logLevels.trace,
            error,
        );

        return;
    }
}

main();
// #endregion module
