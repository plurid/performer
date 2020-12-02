// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        deployLogsPath,
    } from '~server/data/constants';
    // #endregion external
// #endregion imports



// #region module
export const getDeployLogs = async (
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
            deployLogsPath,
            '/' + logname,
        );
        const data = await fs.readFile(logPath, 'utf-8');
        const result = {
            name: stage,
            data,
        };
        results.push(result);
    }

    return results;
}
// #endregion module
