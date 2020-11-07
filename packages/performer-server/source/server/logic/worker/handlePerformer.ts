// #region imports
    // #region libraries
    import {
        workerData,
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

        return;
    } catch (error) {
        return;
    }
}

main();
// #endregion module
