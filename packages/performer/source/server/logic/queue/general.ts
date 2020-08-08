import {
    promises as fs,
} from 'fs';

import path from 'path';

import {
    buildQueuePath,
} from '#server/data/constants';



export const removeFromQueue = async (
    id: string,
) => {
    const buildQueuedPath = path.join(
        buildQueuePath,
        '/' + id + '.json',
    );

    fs.unlink(buildQueuedPath);
}
