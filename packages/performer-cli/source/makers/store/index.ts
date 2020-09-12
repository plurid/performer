// #region imports
    // #region libraries
    import {
        CommanderStatic,
    } from 'commander';
    // #endregion libraries


    // #region external
    import {
        storeSecret,
    } from '../../commands';
    // #endregion external
// #endregion imports



// #region module
const makeStoreCommand = (
    program: CommanderStatic,
) => {
    const store = new program.Command('store');

    store
        .storeOptionsAsProperties(false)
        .passCommandToAction(false)
        .description('store an entity');

    store
        .command('secret')
        .description('store a secret')
        .requiredOption(
            '-n, --name <name>',
            'name',
        )
        .requiredOption(
            '-v, --value <value>',
            'value',
        )
        .requiredOption(
            '-p, --project <project>',
            'project',
        )
        .action(async (options: any) => {
            const {
                name,
                value,
                project,
            } = options;

            await storeSecret(
                name,
                value,
                project,
            );
        });

    return store;
}
// #endregion module



// #region exports
export default makeStoreCommand;
// #endregion exports
