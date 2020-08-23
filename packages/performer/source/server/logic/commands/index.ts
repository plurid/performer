// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import path from 'path';

    import stream from 'stream';

    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Performer,
        PerformerStage,
        BuildData,
        PerformContext,
    } from '#server/data/interfaces';

    import {
        DOCKER_AUTH_USERNAME,
        DOCKER_AUTH_PASSWORD,
        DOCKER_AUTH_SERVER_ADDRESS,
    } from '#server/data/constants';

    import {
        loadStoredSecrets,
    } from '#server/logic/loader';

    import docker from '#server/logic/engine';

    import {
        writeBuildFile,
        saveBuildlog,
    } from '#server/logic/build';
    // #endregion external
// #endregion imports



// #region module
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

    console.log('workDirectoryPath', workDirectoryPath);

    return new Promise (async (resolve, reject) => {
        const containerName = uuid.generate();

        // const workingDir = '/app' + (directory || '');
        const workingDir = '/' + (directory || '');

        const Env = [
            ...environment,
        ];

        const Cmd = typeof command === 'string'
            ? command.split(' ')
            : command;

        // const outsidePath = workDirectoryPath.replace('/app/', '/home/ly3xqhl8g9/Documents/Workarea/performer/packages/performer/');
        // console.log('outsidePath', outsidePath);

        // const volumeName = uuid.generate();
        // const volume = await docker.createVolume(
        //     {
        //         Name: volumeName,
        //     },
        // );

        const workDir = '/app/' + workDirectoryPath.replace('/app/data', '') + workingDir;
        console.log('workDir', workDir);

        const container = await docker.createContainer({
            Image: imagene,
            name: containerName,
            Cmd,
            Env,
            Volumes: {
                // '/performer-volume': {},
                '/app': {},
            },
            HostConfig: {
                Binds: [
                    // `${workDirectoryPath}:/app`,
                    'performer-volume:/app',
                ],
            },
            WorkingDir: workDir,
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

        readableStream.on('error', (error) => {
            console.log('runInContainer error', error);
        });

        readableStream.on('end', async () => {
            logStream.end();

            const lineCommand = typeof command === 'string'
                ? command
                : command.join(' ');

            await saveBuildlog(
                lineCommand,
                id,
                index,
                streamData.join(''),
            );

            try {
                await container.stop();
                await container.remove();
            } catch (error) {
                try {
                    await container.remove();
                } catch (error) {
                    resolve();
                    return;
                }
            }

            resolve();
        });
    });
}
// #endregion module
