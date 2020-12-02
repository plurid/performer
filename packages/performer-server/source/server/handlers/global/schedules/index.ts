// #region imports
    // #region external
    import {
        CLEAN_DOCKER_IMAGES_WINDOW_HOURS,
    } from '~server/data/constants';

    import {
        cleanDockerImagesInWorker,
    } from '~server/logic/worker';
    // #endregion external
// #endregion imports



// #region module
const schedules = () => {
    const time = 1_000 * 60 * 60 * CLEAN_DOCKER_IMAGES_WINDOW_HOURS / 2;

    setInterval(() => {
        cleanDockerImagesInWorker();
    }, time);
};
// #endregion module



// #region exports
export default schedules;
// #endregion exports
