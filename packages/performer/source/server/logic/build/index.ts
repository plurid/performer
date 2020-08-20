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
        BASE_PATH_BUILDS,
        BASE_PATH_BUILD_QUEUE,
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
    const buildQueueName = buildData.id + '.json';

    const buildQueuePath = path.join(
        BASE_PATH_BUILD_QUEUE,
        buildQueueName,
    );

    await storage.upload(
        buildQueuePath,
        Buffer.from(JSON.stringify(buildData, null, 4), 'utf-8'),
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

    const buildFile = id + '.json';

    const buildPath = path.join(
        BASE_PATH_BUILDS,
        buildFile,
    );

    await storage.upload(
        buildPath,
        Buffer.from(JSON.stringify(build, null, 4), 'utf-8'),
    );
}


export const triggerBuild = async (
    buildData: BuildData,
) => {
    try {
        const {
            branchName,
            repositoryRootPath,
            repositoryWorkPath,
            trigger,
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
            '/' + trigger.file,
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
            trigger.project,
        );
    } catch (error) {
        if (logLevel <= logLevels.error) {
            console.log('[Performer Error 500] :: triggerBuild', error);
        }

        return;
    }
}


export const handlePerformer = async (
    buildData: BuildData,
    performer: Performer,
    workDirectoryPath: string,
    performerFilePath: string,
    project: string,
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

    const performContext: PerformContext = {
        timeout,
        nodejs,
        secrets,
        workDirectoryPath,
        performerFilePath,
    };

    for (const [index, stage] of stages.entries()) {
        console.log('Running stage', index, stage);
        await handleStage(
            id,
            stage,
            index,
            performContext,
            start,
            commit,
            project,
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
        project,
    );
}


export const resolveImagene = (
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


export const resolveSecrets = async (
    project: string,
    secretsPerformer: string[] | undefined,
    secretsEnvironment: string[] | undefined
) => {
    if (!secretsPerformer || !secretsEnvironment) {
        return [];
    }

    const storedSecrets = await loadStoredSecrets();
    const indexedProjectSecrets: any = {};

    for (const storedSecret of storedSecrets) {
        if (storedSecret.project === project) {
            indexedProjectSecrets[storedSecret.name] = {
                ...storedSecret,
            };
        }
    }

    const secretsValues: string[] = [];

    for (const secretEnvironment of secretsEnvironment) {
        if (secretsPerformer.includes(secretEnvironment)) {
            const secret = indexedProjectSecrets[secretEnvironment];
            if (secret) {
                const secretValue = `${secret.name}=${secret.value}`;
                secretsValues.push(secretValue);
            }
        }
    }

    return secretsValues;
}


export const handleStage = async (
    id: string,
    stage: PerformerStage,
    index: number,
    performContext: PerformContext,
    start: number,
    commit: string,
    project: string,
) => {
    const {
        imagene,
        environment,
        secretsEnvironment,
    } = stage;

    const {
        secrets,
    } = performContext;

    const resolvedImagene = resolveImagene(imagene);

    if (!resolvedImagene) {
        return;
    }

    const resolvedSecretsEnvironment = await resolveSecrets(
        project,
        secrets,
        secretsEnvironment,
    );

    const environmentValues = [
        ...(environment || []),
        ...resolvedSecretsEnvironment,
    ];


    if (resolvedImagene === 'docker') {
        await runDockerCommand(
            id,
            stage,
            index,
            performContext,
            commit,
            environmentValues,
        );
        return;
    }

    if (resolvedImagene === 'kubectl') {
        await runKubernetesCommand(
            id,
            stage,
            index,
            performContext,
            environmentValues,
        );
        return;
    }

    await runInContainer(
        id,
        stage,
        index,
        performContext,
        resolvedImagene,
        environmentValues,
    );
}


export const runDockerCommand = async (
    id: string,
    stage: PerformerStage,
    index: number,
    performContext: any,
    commit: string,
    environment: string[],
) => {
    console.log('runDockerCommand', stage);

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

    const lineCommand = typeof command === 'string'
        ? command
        : command.join(' ');

    const commandText = 'docker ' + lineCommand.replace('$SHORT_SHA', SHORT_SHA)


    if (commandType.startsWith('build')) {
        return new Promise (async (resolve, reject) => {
            const dockerfile = resolveDockerFile(
                command,
            );

            const dockerFileContext = path.join(
                workDirectoryPath,
                directory || '/',
                dockerfile.replace('dockerfile', ''),
            );
            console.log('dockerFileContext', dockerFileContext);

            const dockerContext = path.join(
                workDirectoryPath,
                directory || '/',
            );
            console.log('dockerContext', dockerContext);

            const srcFiles = await fs.readdir(dockerContext);

            const image = await docker.buildImage(
                {
                    context: dockerFileContext,
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

            logStream.on('error', (error) => {
                console.log('runDockerCommand build error', error);
            });

            logStream.on('end', async () => {
                logStream.end();

                saveBuildlog(
                    commandText,
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
                    username: DOCKER_AUTH_USERNAME,
                    password: DOCKER_AUTH_PASSWORD,
                    serveraddress: DOCKER_AUTH_SERVER_ADDRESS,
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

                logStream.on('error', (error) => {
                    console.log('runDockerCommand push error', error);
                });

                logStream.on('end', async () => {
                    logStream.end();

                    saveBuildlog(
                        commandText,
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


export const resolveDockerFile = (
    command: string | string[],
) => {
    const split = typeof command === 'string'
        ? command.split(' ')
        : command.join(' ').split(' ');

    for (const [index, value] of split.entries()) {
        if (value === '-f' || value === '--file') {
            const dockerfile = split[index + 1] || '';
            return dockerfile;
        }
    }

    return '';
}


export const runKubernetesCommand = async (
    id: string,
    stage: PerformerStage,
    index: number,
    performContext: PerformContext,
    environment: string[],
) => {

}


export const runInContainer = (
    id: string,
    stage: PerformerStage,
    index: number,
    performContext: PerformContext,
    imagene: string,
    environment: string[],
) => {
    console.log('runInContainer', stage);

    const {
        command,
        directory,
    } = stage;

    const {
        workDirectoryPath,
    } = performContext;

    return new Promise (async (resolve, reject) => {
        const containerName = uuid.generate();

        const workingDir = '/app' + (directory || '');

        const Env = [
            ...environment,
        ];

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

        const startedContainer = await container.start();
        console.log('startedContainer', startedContainer);

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

        readableStream.on('error', (error) => {
            console.log('runInContainer error', error);
        });

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
