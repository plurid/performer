// #region imports
    // #region external
    import {
        CLEAN_DOCKER_IMAGES_WINDOW_HOURS,
    } from '#server/data/constants';

    import docker from '#server/logic/engine';
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
                    console.log(`Performer :: removed docker image ${id}`);

                    const dockerImage = docker.getImage(id);

                    await dockerImage.remove();
                }
            } catch (error) {
                console.log('Performer :: error cleanDockerImages > remove image', image.Id, error);
                continue;
            }
        }
    } catch (error) {
        console.log('Performer :: error cleanDockerImages', error);
        return;
    }
}
// #endregion module
