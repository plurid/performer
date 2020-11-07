// #region imports
    // #region external
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

                const windowHours = 1;
                const now = Math.floor(Date.now() / 1000);
                // window hours ago
                const past = now - 3600 * windowHours;
                // window hours from now
                const future = now + 3600 * windowHours;

                if (created > past && created < future) {
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
