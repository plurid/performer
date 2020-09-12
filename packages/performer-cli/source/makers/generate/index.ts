// #region imports
    // #region libraries
    import {
        CommanderStatic,
    } from 'commander';
    // #endregion libraries
// #endregion imports



// #region module
const makeGenerateCommand = (
    program: CommanderStatic,
) => {
    const generate = new program.Command('generate');

    generate
        .storeOptionsAsProperties(false)
        .passCommandToAction(false)
        .description('generate an entity');

    generate
        .command('project')
        .description('generate a project')
        .requiredOption(
            '-n, --name <name>',
            'name',
        )
        .action(async (options: any) => {
            console.log('name', options.name);
        });

    generate
        .command('trigger')
        .description('generate a trigger')
        .requiredOption(
            '-n, --name <name>',
            'name',
        )
        .action(async (options: any) => {
            console.log('name', options.name);
        });

    generate
        .command('deployer')
        .description('generate a deployer')
        .requiredOption(
            '-n, --name <name>',
            'name',
        )
        .action(async (options: any) => {
            console.log('name', options.name);
        });

    return generate
}
// #endregion module



// #region exports
export default makeGenerateCommand;
// #endregion exports
