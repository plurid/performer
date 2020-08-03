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

import {
    Build,
    Performer,
    PerformerStage,
    BuildData,
} from '#server/data/interfaces';

import {
    buildlogsPath,
    buildqueuePath,
    buildsPath,
} from '#server/data/constants';

import {
    copyDirectory,
} from '#server/utilities/copy';

import docker from '#server/engine';



export const pushToBuildQueue = async (
    buildData: BuildData,
) => {
    const buildlogName = buildData.id + '.json';

    const buildlogPath = path.join(
        buildqueuePath,
        buildlogName,
    );

    await fs.writeFile(
        buildlogPath,
        JSON.stringify(buildData, null, 4),
    );

    await writeBuildFile(
        buildData.id,
        'QUEUE',
        buildData.trigger.id,
        0,
        buildData.date,
        [],
    );
}


export const writeBuildFile = async (
    id: string,
    status: any,
    trigger: string,
    time: number,
    date: number,
    stages: string[],
) => {
    const build: Build = {
        id,
        status,
        trigger,
        time,
        date,
        stages,
    };

    const buildFile = id + '.json';

    const buildPath = path.join(
        buildsPath,
        buildFile,
    );

    await fs.writeFile(
        buildPath,
        JSON.stringify(build, null, 4),
    );
}


export const triggerBuild = async (
    buildData: BuildData,
) => {
    const {
        branchName,
        repositoryRootPath,
        repositoryWorkPath,
    } = buildData;


    await fs.mkdir(repositoryWorkPath, {
        recursive: true,
    });

    await copyDirectory(
        repositoryRootPath,
        repositoryWorkPath,
    );

    const gitCommandFetchOrigin = 'git fetch origin';
    const gitCommandResetHardBranch = `git reset --hard origin/${branchName}`;

    execSync(gitCommandFetchOrigin, {
        cwd: repositoryWorkPath,
        stdio: 'ignore',
    });
    execSync(gitCommandResetHardBranch, {
        cwd: repositoryWorkPath,
        stdio: 'ignore',
    });


    const performerFilePath = path.join(
        repositoryWorkPath,
        '/' + buildData.trigger.file,
    );
    const performerFile = await fs.readFile(performerFilePath, 'utf-8');
    const performerObject = yaml.safeLoad(performerFile);

    if (!performerObject || typeof performerObject === 'string') {
        return;
    }

    const performerData: any = performerObject;

    const performer: Performer = {
        ...performerData,
        timeout: performerData.timeout ?? 600,
    };

    handlePerformer(
        buildData,
        performer,
        repositoryWorkPath,
        performerFilePath,
    );
}


export const handlePerformer = async (
    buildData: BuildData,
    performer: Performer,
    workDirectoryPath: string,
    performerFilePath: string,
) => {
    const start = Date.now();

    const {
        id,
        trigger,
        date,
        commit,
    } = buildData;

    const {
        stages,
        timeout,
        nodejs,
        secrets,
    } = performer;

    const performContext = {
        timeout,
        nodejs,
        secrets,
        workDirectoryPath,
        performerFilePath,
    };

    for (const [index, stage] of stages.entries()) {
        await handleStage(
            id,
            stage,
            index,
            performContext,
            start,
            commit,
        );
    }

    const end = Date.now();
    const time = Math.floor((end - start) / 1000);

    const stagesNames = stages.map(stage => stage.name);

    writeBuildFile(
        id,
        'SUCCESS',
        trigger.id,
        time,
        date,
        stagesNames,
    );
}


const resolveImagene = (
    imagene: string,
) => {
    switch (imagene) {
        case 'ubuntu':
            return 'ubuntu:20.04';
        case 'nodejs':
            return 'node:12.18.3';
        case 'docker':
            return 'docker';
        case 'kubectl':
            return 'kubectl';
    }

    return;
}


export const handleStage = async (
    id: string,
    stage: PerformerStage,
    index: number,
    performContext: any,
    start: number,
    commit: string,
) => {
    const {
        imagene,
    } = stage;

    const resolvedImagene = resolveImagene(imagene);

    if (!resolvedImagene) {
        return;
    }

    if (resolvedImagene === 'docker') {
        await runDockerCommand(
            id,
            stage,
            index,
            performContext,
            commit,
        );
        return;
    }

    if (resolvedImagene === 'kubectl') {
        await runKubernetesCommand(
            id,
            stage,
            index,
            performContext,
        );
        return;
    }

    await runInContainer(
        id,
        stage,
        index,
        performContext,
        resolvedImagene,
    );
}


export const runDockerCommand = async (
    id: string,
    stage: PerformerStage,
    index: number,
    performContext: any,
    commit: string,
) => {
    const {
        command,
        directory,
    } = stage;

    const {
        workDirectoryPath,
    } = performContext;

    const commandType = typeof command === 'string'
        ? command.split(' ')[0]
        : command[0];

    const SHORT_SHA = commit.slice(0, 8);

    const tag = resolveDockerTag(
        command,
        SHORT_SHA,
    );


    if (commandType.startsWith('build')) {
        return new Promise (async (resolve, reject) => {
            const dockerContext = path.join(
                workDirectoryPath,
                directory || '/',
            );

            const srcFiles = await fs.readdir(dockerContext);

            const image = await docker.buildImage(
                {
                    context: dockerContext,
                    src: [
                        ...srcFiles,
                    ],
                },
                {
                    t: tag,
                },
            );

            const streamData: string[] = [];

            const logStream = new stream.PassThrough();
            logStream.on('data', (chunk) => {
                const rawData = chunk.toString('utf-8');

                try {
                    const split = rawData.split('\n');

                    for (const value of split) {
                        const data = JSON.parse(value);

                        const {
                            stream,
                        } = data;

                        if (stream) {
                            streamData.push(stream);
                        }
                    }
                } catch (error) {
                    return;
                }
            });

            image.pipe(logStream);

            logStream.on('end', async () => {
                logStream.end();

                const lineCommand = typeof command === 'string'
                    ? command
                    : command.join(' ');

                saveBuildlog(
                    lineCommand,
                    id,
                    index,
                    streamData.join(''),
                );

                resolve();
            });
        });
    }


    if (commandType.startsWith('push')) {
        return new Promise (async (resolve, reject) => {
            try {
                const image = docker.getImage(tag);

                const authconfig = {
                    username: '',
                    password: '',
                    auth: '',
                    email: '',
                    serveraddress: 'https://index.docker.io/v2/',
                };

                const imageStream = await image.push({
                    authconfig,
                });

                const streamData: string[] = [];

                const logStream = new stream.PassThrough();
                logStream.on('data', (chunk) => {
                    const rawData = chunk.toString('utf-8');

                    try {
                        const split = rawData.split('\n');

                        for (const value of split) {
                            const data = JSON.parse(value);

                            const {
                                stream,
                            } = data;

                            if (stream) {
                                streamData.push(stream);
                            }
                        }
                    } catch (error) {
                        return;
                    }
                });

                imageStream.pipe(logStream);

                logStream.on('end', async () => {
                    logStream.end();

                    const lineCommand = typeof command === 'string'
                        ? command
                        : command.join(' ');

                    saveBuildlog(
                        lineCommand,
                        id,
                        index,
                        streamData.join(''),
                    );

                    resolve();
                });
            } catch (error) {
                reject();
                return;
            }
        });
    }
}


export const resolveDockerTag = (
    command: string | string[],
    commitShortSHA: string,
) => {
    const split = typeof command === 'string'
        ? command.split(' ')
        : command.join(' ').split(' ');

    for (const [index, value] of split.entries()) {
        if (value === '-t' || value === '--tag') {
            const tag = split[index + 1] || '';
            const tagShortSha = tag.replace('$SHORT_SHA', commitShortSHA);

            return tagShortSha;
        }

        if (value === 'push') {
            const tag = split[index + 1] || '';
            const tagShortSha = tag.replace('$SHORT_SHA', commitShortSHA);

            return tagShortSha;
        }
    }

    return '';
}


export const runKubernetesCommand = async (
    id: string,
    stage: PerformerStage,
    index: number,
    performContext: any,
) => {

}


export const runInContainer = (
    id: string,
    stage: PerformerStage,
    index: number,
    performContext: any,
    imagene: string,
) => {
    const {
        command,
        directory,
        environment,
    } = stage;

    const {
        workDirectoryPath,
    } = performContext;

    return new Promise (async (resolve, reject) => {
        const containerName = uuid.generate();

        const workingDir = '/app' + directory;

        const Env = environment
            ? [
                ...environment
            ] : [];

        const Cmd = typeof command === 'string'
            ? command.split(' ')
            : command;

        const container = await docker.createContainer({
            Image: imagene,
            name: containerName,
            Cmd,
            Env,
            Volumes: {
                '/app': {},
            },
            HostConfig: {
                Binds: [
                    `${workDirectoryPath}:/app`,
                ],
            },
            WorkingDir: workingDir,
        });

        await container.start();

        const streamData: string[] = [];

        const logStream = new stream.PassThrough();
        logStream.on('data', (chunk) => {
            streamData.push(chunk.toString('utf8'));
        });

        const readableStream = await container.logs({
            follow: true,
            stdout: true,
            stderr: true,
        });

        container.modem.demuxStream(
            readableStream,
            logStream,
            logStream,
        );

        readableStream.on('end', async () => {
            logStream.end();

            const lineCommand = typeof command === 'string'
                ? command
                : command.join(' ');

            saveBuildlog(
                lineCommand,
                id,
                index,
                streamData.join(''),
            );

            resolve();
        });
    });
}


export const saveBuildlog = (
    command: string,
    buildID: string,
    stageIndex: number,
    data: string,
) => {
    const buildlogName = buildID + '_' + stageIndex;

    const buildlogPath = path.join(
        buildlogsPath,
        buildlogName,
    );

    const dataLog = '> ' + command + '\n'
        + data;

    fs.writeFile(buildlogPath, dataLog);
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
            buildlogsPath,
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
