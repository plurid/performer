// #region imports
    // #region libraries
    import {
        CommanderStatic,
    } from 'commander';
    // #endregion libraries


    // #region external
    import {
        addProvider,
        addImagene,
    } from '../../commands';
    // #endregion external
// #endregion imports



// #region module
const makeAddCommand = (
    program: CommanderStatic,
) => {
    const add = new program.Command('add');

    add
        .storeOptionsAsProperties(false)
        .passCommandToAction(false)
        .description('add an existing, external entity');

    add
        .command('provider')
        .description('add a provider')
        .requiredOption(
            '-e, --type <type>',
            'type',
        )
        .requiredOption(
            '-n, --name <name>',
            'name',
        )
        .requiredOption(
            '-t, --token <token>',
            'token',
        )
        .action(async (options: any) => {
            await addProvider(
                options.type,
                options.name,
                options.token,
            );
        });

    add
        .command('imagene')
        .description('add an imagene')
        .requiredOption(
            '-n, --name <name>',
            'name',
        )
        .action(async (options: any) => {
            await addImagene(
                options.name,
            );
        });

    return add;
}
// #endregion module



// #region exports
export default makeAddCommand;
// #endregion exports
