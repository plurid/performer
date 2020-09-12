// #region imports
    // #region libraries
    import {
        CommanderStatic,
    } from 'commander';
    // #endregion libraries


    // #region external
    import {
        setupWebhook,
    } from '../../commands';
    // #endregion external
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
            await setupWebhook(
                options.path
            );
        });

    return setup;
}
// #endregion module



// #region exports
export default makeSetupCommand;
// #endregion exports
