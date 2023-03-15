const {
    BUILD_DIRECTORY,
} = require ('./shared');

const {
    plugins,
} = require('./server.base');



const triggerBuildWorker = {
    input: 'source/server/logic/workers/triggerBuild.ts',
    output: [
        {
            file: `./${BUILD_DIRECTORY}/worker_triggerBuild.js`,
            format: 'cjs',
            exports: 'named',
        },
    ],
    external: [
        'worker_threads',
        'fs',
        'path',
        'js-yaml',
        '@plurid/deon',
        'child_process',
        'ncp',
        'aws-sdk',
        '@plurid/delog',
    ],
    plugins: [
        plugins.typescript(),
    ],
};

const handlePerformerWorker = {
    input: 'source/server/logic/workers/handlePerformer.ts',
    output: [
        {
            file: `./${BUILD_DIRECTORY}/worker_handlePerformer.js`,
            format: 'cjs',
            exports: 'named',
        },
    ],
    external: [
        'worker_threads',
        'fs',
        'path',
        'stream',
        '@plurid/plurid-functions',
        'ncp',
        'dockerode',
        'aws-sdk',
        '@plurid/delog',
    ],
    plugins: [
        plugins.typescript(),
    ],
};

const cleanDockerImagesWorker = {
    input: 'source/server/logic/workers/cleanDockerImages.ts',
    output: [
        {
            file: `./${BUILD_DIRECTORY}/worker_cleanDockerImages.js`,
            format: 'cjs',
            exports: 'named',
        },
    ],
    external: [
        'dockerode',
        'path',
        'fs',
        'ncp',
        '@plurid/delog',
    ],
    plugins: [
        plugins.typescript(),
    ],
};

const workers = [
    triggerBuildWorker,
    handlePerformerWorker,
    cleanDockerImagesWorker,
];



module.exports = {
    workers,
};
