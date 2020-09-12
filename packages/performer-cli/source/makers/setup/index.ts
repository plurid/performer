// #region imports
    // #region libraries
    import {
        CommanderStatic,
    } from 'commander';
    // #endregion libraries
// #endregion imports



// #region module
const makeSetupCommand = (
    program: CommanderStatic,
) => {
    const setup = new program.Command('setup');

    setup
        .storeOptionsAsProperties(false)
        .passCommandToAction(false)
        .description('setup an entity');

    setup
        .command('webhook')
        .description('setup an webhook')
        .requiredOption(
            '-p, --path <path>',
            'path',
        )
        .action(async (options: any) => {
            console.log('kind', options.path);
        });

    return setup;
}
// #endregion module



// #region exports
export default makeSetupCommand;
// #endregion exports
