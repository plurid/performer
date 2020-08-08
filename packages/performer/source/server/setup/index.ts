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


export default setup;
