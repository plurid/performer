import fs from 'fs';

import {
    providersPath,
    imagenesPath,
    repositoriesPath,
    repositoriesMetadataPath,
    webhooksPath,
    projectsPath,
    secretsPath,
    triggersPath,
    buildsPath,
    buildlogsPath,
    buildqueuePath,
} from '#server/data/constants';



const makeDirectories = () => {
    fs.mkdirSync(providersPath, {
        recursive: true,
    });

    fs.mkdirSync(repositoriesPath, {
        recursive: true,
    });
    fs.mkdirSync(repositoriesMetadataPath, {
        recursive: true,
    });

    fs.mkdirSync(webhooksPath, {
        recursive: true,
    });

    fs.mkdirSync(projectsPath, {
        recursive: true,
    });

    fs.mkdirSync(secretsPath, {
        recursive: true,
    });

    fs.mkdirSync(triggersPath, {
        recursive: true,
    });

    fs.mkdirSync(buildsPath, {
        recursive: true,
    });

    fs.mkdirSync(buildlogsPath, {
        recursive: true,
    });

    fs.mkdirSync(buildqueuePath, {
        recursive: true,
    });

    fs.mkdirSync(imagenesPath, {
        recursive: true,
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
