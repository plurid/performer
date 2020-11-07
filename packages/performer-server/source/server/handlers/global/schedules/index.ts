// #region imports
    // #region libraries
    import path from 'path';

    import Bree from 'bree';
    // #endregion libraries
// #endregion imports



// #region module
const schedules = () => {
    const scheduler = new Bree({
        jobs: [
            {
                name: 'cleanDockerImages',
                path: path.join(
                    __dirname,
                    'worker_cleanDockerImages',
                ),
                interval: 'every 2 minutes',
            },
        ],
    });

    scheduler.start();

    scheduler.on('worker created', (name: string) => {
        console.log('worker created', name);
        console.log(scheduler.workers[name]);
    });
};
// #endregion module



// #region exports
export default schedules;
// #endregion exports