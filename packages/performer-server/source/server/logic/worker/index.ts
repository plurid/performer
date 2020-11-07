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
        const worker = new Worker(
            `./${BUILD_DIRECTORY}/handlePerformer.js`,
            {
                workerData: {
                    ...data,
                },
            },
        );

        worker.on('message', (result) => {
            console.log('Worker finished ', result);
        });

        worker.on('exit', (code) => {
            console.log('Worker stopped ' + code);
        });
    }
}
// #endregion module



// #region exports
export {
    handlePerformerInWorker,
};
// #endregion exports
