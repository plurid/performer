import stream from 'stream';

import docker from './';



export const testContainer = async () => {
    try {
        const container = await docker.createContainer({
            Image: 'ubuntu:20.04',
            name: 'foo',
            Cmd: 'echo after sleep'.split(' '),
            // Cmd: [
            //     'ls -la',
            //     // '/bin/ls',
            //     // '-la',

            //     // '/bin/env',
            // ],
            // Env: [
            // ],
            // Volumes: {
            //     '/app': {},
            // },
            // HostConfig: {
            //     Binds: [
            //         '/path/to/app:/app',
            //     ],
            // },
            // WorkingDir: '/',
        });


        await container.start();

        const logStream = new stream.PassThrough();
        logStream.on('data', (chunk) => {
            console.log(chunk.toString('utf8'));
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

        readableStream.on('end', () => {
            logStream.end('!stop!');
        });
    } catch (error) {
        console.log('error', error);
    }
}
