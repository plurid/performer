// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import path from 'path';

    import stream from 'stream';

    import {
        execSync,
    } from 'child_process';

    import yaml from 'js-yaml';

    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Build,
        Performer,
        PerformerStage,
        BuildData,
        PerformContext,
    } from '#server/data/interfaces';

    import {
        BASE_PATH_BUILD_LOGS,

        DOCKER_AUTH_USERNAME,
        DOCKER_AUTH_PASSWORD,
        DOCKER_AUTH_SERVER_ADDRESS,

        logLevel,
        logLevels,
    } from '#server/data/constants';

    import {
        loadStoredSecrets,
    } from '#server/logic/loader';

    import docker from '#server/logic/engine';

    import database from '#server/services/database';
    import storage from '#server/services/storage';

    import {
        copyDirectory,
    } from '#server/utilities';
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

    await writeBuildFile(
        buildData.id,
        'QUEUE',
        buildData.trigger.id,
        0,
        buildData.date,
        [],
        buildData.trigger.project,
    );
}


export const writeBuildFile = async (
    id: string,
    status: any,
    trigger: string,
    time: number,
    date: number,
    stages: string[],
    project: string,
) => {
    const build: Build = {
        id,
        status,
        trigger,
        time,
        date,
        stages,
        project,
    };

    await database.store(
        'build',
        id,
        build,
    );
}


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


export const clearBuilds = async () => {
    database.obliterateAll('builds');
}
// #endregion module
