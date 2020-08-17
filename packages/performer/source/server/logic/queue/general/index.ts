// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        buildQueuePath,
    } from '#server/data/constants';
    // #endregion external
// #endregion imports



// #region module
export const removeFromQueue = async (
    id: string,
) => {
    const buildQueuedPath = path.join(
        buildQueuePath,
        '/' + id + '.json',
    );

    fs.unlink(buildQueuedPath);
}
// #endregion module
