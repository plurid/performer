// #region imports
    // #region libraries
    import {
        workerData,
        parentPort,
    } from 'worker_threads';
    // #endregion libraries


    // #region external
    import {
        handlePerformer,
    } from '../commands';
    // #endregion external
// #endregion imports



// #region module
parentPort?.postMessage(async () => {
    try {
        await handlePerformer(
            workerData.buildData,
            workerData.performerTriggerData,
            workerData.workDirectoryPath,
            workerData.project,
        );

        return true;
    } catch (error) {
        return false;
    }
});
// #endregion module
