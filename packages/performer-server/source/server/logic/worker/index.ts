// #region imports
    // #region libraries
    import {
        Worker,
        isMainThread,
    } from 'worker_threads';
    // #endregion libraries


    // #region external
    import {
        BuildData,
    } from '~server/data/interfaces';

    import {
        BUILD_DIRECTORY,
    } from '~server/data/constants';
    // #endregion external
// #endregion imports



// #region module
const triggerBuildInWorker = (
    data: BuildData,
) => {
    new Worker(
        `./${BUILD_DIRECTORY}/worker_triggerBuild.js`,
        {
            workerData: {
                data,
            },
        },
    );
}


const handlePerformerInWorker = (
    data: any,
) => {
    new Worker(
        `./${BUILD_DIRECTORY}/worker_handlePerformer.js`,
        {
            workerData: {
                ...data,
            },
        },
    );
}


const cleanDockerImagesInWorker = () => {
    new Worker(
        `./${BUILD_DIRECTORY}/worker_cleanDockerImages.js`,
    );
}
// #endregion module



// #region exports
export {
    triggerBuildInWorker,
    handlePerformerInWorker,
    cleanDockerImagesInWorker,
};
// #endregion exports
