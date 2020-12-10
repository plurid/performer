// #region imports
    // #region libraries
    import resolve from '@rollup/plugin-node-resolve';
    import commonjs from '@rollup/plugin-commonjs';
    import typescript from 'rollup-plugin-typescript2';
    // #endregion libraries


    // #region external
    import pkg from '../package.json';
    // #endregion external
// #endregion imports



// #region module
export default {
    input: './source/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
    ],
    external: [
        'fs',
        'os',
        'path',
        'events',
        'child_process',
        '@plurid/deon',
        '@plurid/performer-requests',
        'https',
        'http',
        'url',
        'stream',
        'zlib',
        'react',
    ],
    watch: {
        include: 'source/**',
    },
    plugins: [
        typescript({
            tsconfig: './tsconfig.json',
        }),
        resolve({
            preferBuiltins: true,
        }),
        commonjs(),
    ],
}
// #endregion module
