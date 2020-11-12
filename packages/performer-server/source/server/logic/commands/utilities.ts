// #region imports
    // #region external
    import {
        logLevels,

        CLEAN_DOCKER_IMAGES_WINDOW_HOURS,
    } from '#server/data/constants';

    import docker from '#server/logic/engine';

    import logging from '#server/services/logger';
    // #endregion external
// #endregion imports



// #region module
export const cleanDockerImages = async () => {
    try {
        const images = await docker.listImages();

        for (const image of images) {
            try {
                const {
                    Id: id,
                    Created: created,
                } = image;

                const windowHours = CLEAN_DOCKER_IMAGES_WINDOW_HOURS * 3_600;
                const now = Math.floor(Date.now() / 1000);
                // window hours ago
                const past = now - windowHours;
                // window hours from now
                const future = now + windowHours;

                // check if im  age is older than window hours
                const difference = created - past;
                if (difference < windowHours) {
                    continue;
                }

                if (created > past && created < future) {
                    logging.log(
                        `performer :: removed docker image ${id}`,
                        logLevels.trace,
                    );

                    const dockerImage = docker.getImage(id);

                    await dockerImage.remove();
                }
            } catch (error) {
                logging.log(
                    `performer :: error cleanDockerImages > remove image ${image.Id}`,
                    logLevels.error,
                    error
                );

                continue;
            }
        }
    } catch (error) {
        logging.log(
            `performer :: error cleanDockerImages`,
            logLevels.error,
            error
        );

        return;
    }
}
// #endregion module
