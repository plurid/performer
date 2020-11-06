// #region imports
    // #region libraries
    import {
        Worker,
    } from 'worker_threads';
    // #endregion libraries
// #endregion imports



// #region module
const handlePerformerInWorker = (
    data: any,
) => {
    const worker = new Worker(
        './handlePerformer.js',
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
// #endregion module



// #region exports
export {
    handlePerformerInWorker,
};
// #endregion exports
