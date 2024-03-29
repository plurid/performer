const {
    input,
    output,
    external,
    plugins,
} = require('./server.base');

const {
    workers,
} = require('./server.workers');



export default [
    ...workers,

    {
        input,
        output,
        external,
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
            plugins.terser(),
        ],
    },
];
