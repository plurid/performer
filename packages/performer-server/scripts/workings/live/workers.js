const esbuild = require('esbuild');

const common = require('./common');

const pkg = require('../../../package.json');

const {
    resolvedESModules: esModules,
    resolvedExternals: externals,
} = require('../logic');



const external = esModules.length === 0
    ? ['./node_modules/*']
    : [
        ...Object
            .keys(pkg.dependencies)
            .filter(dependency => !esModules.includes(dependency)),
        ...externals,
    ];



const workers = [
    {
        file: 'source/server/logic/workers/triggerBuild.ts',
        output: 'worker_triggerBuild.js',
    },
    {
        file: 'source/server/logic/workers/handlePerformer.ts',
        output: 'worker_handlePerformer.js',
    },
    {
        file: 'source/server/logic/workers/cleanDockerImages.ts',
        output: `worker_cleanDockerImages.js`,
    },
];


const build = async () => {
    for (const worker of workers) {
        const context = await esbuild.context({
            ...common,
            entryPoints: [
                worker.file
            ],
            platform: 'node',
            external,
            outfile: `build/${worker.output}`,
        });

        context.watch();
    }
}
build();
