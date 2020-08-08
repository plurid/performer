import {
    promises as fs,
} from 'fs';

import path from 'path';

import {
    deployLogsPath,
} from '#server/data/constants';



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
