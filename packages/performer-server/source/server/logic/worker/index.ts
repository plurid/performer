// #region imports
    // #region libraries
    import {
        Worker,
        isMainThread,
    } from 'worker_threads';
    // #endregion libraries


    // #region external
    import {
        BUILD_DIRECTORY,
    } from '#server/data/constants';
    // #endregion external
// #endregion imports



// #region module
const handlePerformerInWorker = (
    data: any,
) => {
    if (isMainThread) {
        new Worker(
            `./${BUILD_DIRECTORY}/worker_handlePerformer.js`,
            {
                workerData: {
                    ...data,
                },
            },
        );
    }
}


const cleanDockerImagesInWorker = () => {
    if (isMainThread) {
        new Worker(
            `./${BUILD_DIRECTORY}/worker_cleanDockerImages.js`,
        );
    }
}
// #endregion module



// #region exports
export {
    handlePerformerInWorker,
    cleanDockerImagesInWorker,
};
// #endregion exports
