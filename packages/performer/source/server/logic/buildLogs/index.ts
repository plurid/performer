// #region imports
    // #region libraries
    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        BASE_PATH_BUILD_LOGS,
    } from '#server/data/constants';

    import storage from '#server/services/storage';
    // #endregion external
// #endregion imports



// #region module
export const saveBuildlog = async (
    command: string,
    buildID: string,
    stageIndex: number,
    data: string,
) => {
    const buildlogName = buildID + '_' + stageIndex;

    const buildlogPath = path.join(
        BASE_PATH_BUILD_LOGS,
        buildlogName,
    );

    const dataLog = '> ' + command + '\n'
        + data;

    await storage.upload(
        buildlogPath,
        Buffer.from(dataLog, 'utf-8'),
    );
}


export const getBuildLogs = async (
    id: string,
    stages: string[],
) => {
    if (stages.length === 0) {
        return [];
    }

    const results: any[] = [];

    for (const [index, stage] of stages.entries()) {
        const logname = id + '_' + index;
        const logPath = path.join(
            BASE_PATH_BUILD_LOGS,
            logname,
        );

        const data = await storage.download(
            logPath,
        ) || '';

        const result = {
            name: stage,
            data,
        };
        results.push(result);
    }

    return results;
}
// #endregion module
