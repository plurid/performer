import fs from 'fs';
import path from 'path';

import {
    BASE_PATH,
    BASE_PATH_REPOSITORIES,
    BASE_PATH_REPOSITORIES_METADATA,
    BASE_PATH_WEBHOOKS,
    BASE_PATH_TRIGGERS,
    BASE_PATH_BUILDS,
    BASE_PATH_BUILDLOGS,
    BASE_PATH_BUILDQUEUE,
} from '#server/data/constants';



const setup = () => {
    const repositoriesPath = path.join(BASE_PATH, BASE_PATH_REPOSITORIES);
    const repositoriesMetadataPath = path.join(BASE_PATH, BASE_PATH_REPOSITORIES_METADATA);
    const webhooksPath = path.join(BASE_PATH, BASE_PATH_WEBHOOKS);
    const triggersPath = path.join(BASE_PATH, BASE_PATH_TRIGGERS);
    const buildsPath = path.join(BASE_PATH, BASE_PATH_BUILDS);
    const buildlogsPath = path.join(BASE_PATH, BASE_PATH_BUILDLOGS);
    const buildqueuePath = path.join(BASE_PATH, BASE_PATH_BUILDQUEUE);

    try {
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
    } catch (error) {
        return;
    }
}


export default setup;
