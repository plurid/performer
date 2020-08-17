// #region imports
    // #region external
    import {
        providersPath,
        imagenesPath,
        repositoriesPath,
        repositoriesMetadataPath,
        webhooksPath,
        projectsPath,
        secretsPath,
        triggersPath,
        deployersPath,
        buildsPath,
        buildLogsPath,
        buildQueuePath,
        deploysPath,
    } from '#server/data/constants';

    import {
        makeDirectorySync,
    } from '#server/utilities/directory';
    // #endregion external
// #endregion imports



// #region module
const makeDirectories = () => {
    const directories = [
        providersPath,
        imagenesPath,
        repositoriesPath,
        repositoriesMetadataPath,
        webhooksPath,
        projectsPath,
        secretsPath,
        triggersPath,
        deployersPath,
        buildsPath,
        buildLogsPath,
        buildQueuePath,
        deploysPath,
    ];

    directories.forEach(directory => {
        makeDirectorySync(directory);
    });
}


const setup = () => {
    try {
        makeDirectories();
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export default setup;
// #endregion exports
