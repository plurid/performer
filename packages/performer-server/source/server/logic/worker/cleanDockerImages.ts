// #region imports
    // #region external
    import {
        cleanDockerImages,
    } from '../commands/utilities';
    // #endregion external
// #endregion imports



// #region module
const main = async () => {
    try {
        await cleanDockerImages();

        return;
    } catch (error) {
        return;
    }
}

main();
// #endregion module
