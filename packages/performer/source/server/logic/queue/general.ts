import {
    promises as fs,
} from 'fs';

import path from 'path';

import {
    buildqueuePath,
} from '#server/data/constants';



export const removeFromQueue = async (
    id: string,
) => {
    const buildQueuedPath = path.join(
        buildqueuePath,
        '/' + id + '.json',
    );

    fs.unlink(buildQueuedPath);
}
