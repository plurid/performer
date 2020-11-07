const {
    input,
    output,
    plugins,
    externalPackages,

    workers,
} = require('./server.base');



export default [
    ...workers,

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
            plugins.sourceMaps(),
            plugins.typescript(),
        ],
    },
];
