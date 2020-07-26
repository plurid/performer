import fs from 'fs';
import path from 'path';

import {
    BASE_PATH,
    BASE_PATH_REPOSITORIES,
    BASE_PATH_TRIGGERS,
    BASE_PATH_WEBHOOKS,
} from '#server/data/constants';



const setup = () => {
    const repositoriesPath = path.join(BASE_PATH, BASE_PATH_REPOSITORIES);
    const triggersPath = path.join(BASE_PATH, BASE_PATH_TRIGGERS);
    const webhooksPath = path.join(BASE_PATH, BASE_PATH_WEBHOOKS);

    try {
        fs.mkdirSync(repositoriesPath, {
            recursive: true,
        });

        fs.mkdirSync(triggersPath, {
            recursive: true,
        });

        fs.mkdirSync(webhooksPath, {
            recursive: true,
        });
    } catch (error) {
        return;
    }
}


export default setup;
