// #region imports
    // #region libraries
    import {
        workerData,
    } from 'worker_threads';
    // #endregion libraries


    // #region external
    import {
        triggerBuild,
    } from '../build/triggerBuild';
    // #endregion external
// #endregion imports



// #region module
const main = async () => {
    try {
        await triggerBuild(
            workerData.data,
        );

        return;
    } catch (error) {
        return;
    }
}

main();
// #endregion module
