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
const main = async () => {
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
}

main();


parentPort?.postMessage(async () => {
    return 'runs';
});
// #endregion module
