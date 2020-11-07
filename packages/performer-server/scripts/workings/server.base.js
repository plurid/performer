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


const handlePerformerWorker = {
    input: 'source/server/logic/worker/handlePerformer.ts',
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
    ],
    plugins: [
        plugins.typescript(),
        plugins.sourceMaps(),
    ],
};


const cleanDockerImagesWorker = {
    input: 'source/server/logic/worker/cleanDockerImages.ts',
    output: [
        {
            file: `./${BUILD_DIRECTORY}/worker_cleanDockerImages.js`,
            format: 'cjs',
            exports: 'named',
        },
    ],
    external: [
        'dockerode',
    ],
    plugins: [
        plugins.typescript(),
        plugins.sourceMaps(),
    ],
};

const workers = [
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
