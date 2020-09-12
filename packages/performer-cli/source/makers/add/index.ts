// #region imports
    // #region libraries
    import {
        CommanderStatic,
    } from 'commander';
    // #endregion libraries
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
            '-k, --kind <kind>',
            'kind',
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
            console.log('kind', options.kind);
            console.log('name', options.name);
            console.log('token', options.token);
        });

    add
        .command('imagene')
        .description('add an imagene')
        .requiredOption(
            '-n, --name <name>',
            'name',
        )
        .action(async (options: any) => {
            console.log('name', options.name);
        });

    return add;
}
// #endregion module



// #region exports
export default makeAddCommand;
// #endregion exports
