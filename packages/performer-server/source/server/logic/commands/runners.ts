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
        PerformerStage,
        PerformContext,
    } from '#server/data/interfaces';

    import {
        DOCKER_AUTH_USERNAME,
        DOCKER_AUTH_PASSWORD,
        DOCKER_AUTH_SERVER_ADDRESS,
        IN_CONTAINER_USAGE,
        IN_CONTAINER_HOST_BIND,

        logLevels,
    } from '#server/data/constants';

    import docker from '#server/logic/engine';

    import {
        saveBuildlog,
    } from '#server/logic/buildLogs';

    import logger from '#server/services/logger';
    // #endregion external


    // #region internal
    import {
        resolveDockerFile,
        resolveDockerTag,
    } from './resolvers';
    // #endregion internal
// #endregion imports



// #region module
export const runDockerCommand = async (
    id: string,
    stage: PerformerStage,
    index: number,
    performContext: any,
    commit: string,
    environment: string[],
) => {
    logger.log(
        'performer :: runDockerCommand started',
        logLevels.trace,
        undefined,
        JSON.stringify(stage),
    );

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
            try {
                logger.log(
                    'performer :: runDockerCommand build started',
                    logLevels.trace,
                );

                const dockerfile = resolveDockerFile(
                    command,
                );

                /**
                 * if the last argument of the docker command is .
                 */
                const dockerContext = path.join(
                    workDirectoryPath,
                    directory || '/',
                );
                // console.log('dockerContext', dockerContext);

                const srcFiles = await fs.readdir(dockerContext);


                const image = await docker.buildImage(
                    {
                        context: dockerContext,
                        src: [
                            ...srcFiles,
                        ],
                    },
                    {
                        dockerfile,
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
                    logger.log(
                        'performer :: runDockerCommand build errored',
                        logLevels.error,
                        error,
                    );
                });

                logStream.on('end', async () => {
                    logStream.end();

                    logger.log(
                        'performer :: runDockerCommand build ended',
                        logLevels.trace,
                    );

                    saveBuildlog(
                        commandText,
                        id,
                        index,
                        streamData.join(''),
                    );

                    resolve();
                });
            } catch (error) {
                logger.log(
                    'performer :: runDockerCommand build errored',
                    logLevels.error,
                    error,
                );

                reject();
                return;
            }
        });
    }


    if (commandType.startsWith('push')) {
        return new Promise (async (resolve, reject) => {
            try {
                logger.log(
                    'performer :: runDockerCommand push started',
                    logLevels.trace,
                );

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
                    logger.log(
                        'performer :: runDockerCommand push errored',
                        logLevels.error,
                        error,
                    );
                });

                logStream.on('end', async () => {
                    logStream.end();

                    logger.log(
                        'performer :: runDockerCommand push ended',
                        logLevels.trace,
                    );

                    await saveBuildlog(
                        commandText,
                        id,
                        index,
                        streamData.join(''),
                    );

                    await docker.getImage(tag).remove();

                    resolve();
                });
            } catch (error) {
                logger.log(
                    'performer :: runDockerCommand push errored',
                    logLevels.error,
                    error,
                );

                reject();
                return;
            }
        });
    }
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
    logger.log(
        'performer :: runInContainer started',
        logLevels.trace,
        undefined,
        JSON.stringify(stage),
    );

    const {
        command,
        directory,
    } = stage;

    const {
        workDirectoryPath,
    } = performContext;
    // console.log('workDirectoryPath', workDirectoryPath);

    return new Promise (async (resolve, reject) => {
        try {
            logger.log(
                'performer :: runInContainer started',
                logLevels.trace,
            );

            const containerName = uuid.generate();

            const cleanDirectory = directory
                ? directory.startsWith('/')
                    ? directory.slice(1)
                    : directory
                : '';

            const workingDir = '/' + cleanDirectory;
            // console.log('workingDir', workingDir);

            const Env = [
                ...environment,
            ];

            const Cmd = typeof command === 'string'
                ? command.split(' ')
                : command;

            const workingDirectory = IN_CONTAINER_USAGE
                ? workDirectoryPath + workingDir
                : '/app' + workingDir;
            // console.log('workingDirectory', workingDirectory);

            const hostBind = IN_CONTAINER_USAGE
                ? IN_CONTAINER_HOST_BIND
                : workDirectoryPath;
            // console.log('hostBind', hostBind);

            const containerDirectory = IN_CONTAINER_USAGE
                ? '/app/data'
                : '/app';
            // console.log('containerDirectory', containerDirectory);

            const Volumes: any = {};
            Volumes[containerDirectory] = {};

            const container = await docker.createContainer({
                Image: imagene,
                name: containerName,
                Cmd,
                Env,
                Volumes,
                HostConfig: {
                    Binds: [
                        `${hostBind}:${containerDirectory}`,
                    ],
                },
                WorkingDir: workingDirectory,
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
                logger.log(
                    'performer :: runInContainer errored',
                    logLevels.error,
                    error,
                );
            });

            readableStream.on('end', async () => {
                logStream.end();

                logger.log(
                    'performer :: runInContainer ended',
                    logLevels.trace,
                );

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
                    logger.log(
                        'performer :: runInContainer container stop failed',
                        logLevels.error,
                        error,
                    );

                    try {
                        await container.remove();
                    } catch (error) {
                        logger.log(
                            'performer :: runInContainer container remove failed',
                            logLevels.error,
                            error,
                        );

                        resolve();
                        return;
                    }
                }

                resolve();
            });
        } catch (error) {
            logger.log(
                'performer :: runInContainer errored',
                logLevels.error,
                error,
            );

            reject();
            return;
        }
    });
}
// #endregion module
