import fs from 'fs';

import {
    providersPath,
    repositoriesPath,
    repositoriesMetadataPath,
    webhooksPath,
    triggersPath,
    buildsPath,
    buildlogsPath,
    buildqueuePath,
    imagenesPath,
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
