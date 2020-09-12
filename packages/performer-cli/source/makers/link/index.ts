// #region imports
    // #region libraries
    import {
        CommanderStatic,
    } from 'commander';
    // #endregion libraries


    // #region external
    import {
        linkRepository,
    } from '../../commands';
    // #endregion external
// #endregion imports



// #region module
const makeLinkCommand = (
    program: CommanderStatic,
) => {
    const link = new program.Command('link');

    link
        .storeOptionsAsProperties(false)
        .passCommandToAction(false)
        .description('link an existing, external entity');

    link
        .command('repository')
        .description('link a repository')
        .requiredOption(
            '-n, --name <name>',
            'name',
        )
        .action(async (options: any) => {
            await linkRepository(
                options.name,
            );
        });

    return link;
}
// #endregion module



// #region exports
export default makeLinkCommand;
// #endregion exports
