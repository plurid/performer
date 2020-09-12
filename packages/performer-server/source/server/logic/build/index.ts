// #region imports
    // #region external
    import {
        Build,
        BuildData,
    } from '#server/data/interfaces';

    import database from '#server/services/database';
    // #endregion external
// #endregion imports



// #region module
export const pushToBuildQueue = async (
    buildData: BuildData,
) => {
    await database.store(
        'buildqueue',
        buildData.id,
        buildData,
    );

    const build: Build = {
        id: buildData.id,
        status: 'QUEUE',
        trigger: buildData.trigger.id,
        time: 0,
        date: buildData.date,
        stages: [],
        project: buildData.trigger.project,
    };

    await database.store(
        'build',
        buildData.id,
        build,
    );

    return build;
}


export const clearBuilds = async () => {
    await database.obliterateAll('builds');

    return true;
}
// #endregion module
