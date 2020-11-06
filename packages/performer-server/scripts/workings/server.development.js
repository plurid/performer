const {
    input,
    output,
    plugins,
    externalPackages,

    handlePerformerWorker,
} = require('./server.base');



export default [
    {
        input,
        output,
        external: externalPackages,
        plugins: [
            plugins.postcss(),
            plugins.url(),
            plugins.json(),
            plugins.external(),
            plugins.resolve(),
            plugins.commonjs(),
            /** typescript and sourcemaps in this order to allow for styled components transfomer (?) */
            plugins.typescript(),
            plugins.sourceMaps(),
        ],
    },

    handlePerformerWorker,
];
