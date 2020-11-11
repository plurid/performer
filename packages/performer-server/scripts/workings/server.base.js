const path = require('path');

const postcss = require('rollup-plugin-postcss');
const url = require('@rollup/plugin-url');
const json = require('@rollup/plugin-json');
const typescript = require('rollup-plugin-typescript2');
const external = require('rollup-plugin-peer-deps-external');
const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const sourceMaps = require('rollup-plugin-sourcemaps');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;



const BUILD_DIRECTORY = process.env.PLURID_BUILD_DIRECTORY || 'build';

const isProduction = process.env.ENV_MODE === 'production';

const input = 'source/server/index.ts';

const output = [
    {
        file: `./${BUILD_DIRECTORY}/index.js`,
        format: 'cjs',
        exports: 'named',
    },
];

const externalPackages = [
    'child_process',
    'fs',
    'https',
    'path',
    'stream',
    'worker_threads',
];

const styledComponentsTransformer = createStyledComponentsTransformer({
    ssr: true,
    displayName: !isProduction,
});


const plugins = {
    postcss: () => postcss(),
    url: () => url({
        include: [
            '**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg',  '**/*.gif',
            '**/*.woff', '**/*.ttf', '**/*.otf', '**/*.eof',
            '**/*.wav', '**/*.mp3',
            '**/*.pdf',
            '**/*.mov', '**/*.mp4',
        ],
        limit: 0,
        emitFiles: true,
        fileName: 'client/assets/[name][extname]',
        sourceDir: path.join(__dirname, 'source'),
    }),
    json: () => json(),
    typescript: () => typescript({
        tsconfig: './tsconfig.json',
        transformers: [
            () => ({
                before: [styledComponentsTransformer],
            }),
        ],
    }),
    external: () => external({
        includeDependencies: true,
    }),
    resolve: () => resolve({
        preferBuiltins: true,
    }),
    commonjs: () => commonjs(),
    sourceMaps: () => sourceMaps(),
};


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
    input,
    output,
    plugins,
    externalPackages,

    workers,
};
