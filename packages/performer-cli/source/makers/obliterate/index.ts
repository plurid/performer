// #region imports
    // #region libraries
    import {
        CommanderStatic,
    } from 'commander';
    // #endregion libraries
// #endregion imports



// #region module
const makeObliterateCommand = (
    program: CommanderStatic,
) => {
    const obliterate = new program.Command('obliterate');

    obliterate
        .storeOptionsAsProperties(false)
        .passCommandToAction(false)
        .description('obliterate one or more entities');

    obliterate
        .command('provider')
        .description('obliterate a provider')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
        });

    obliterate
        .command('imagene')
        .description('obliterate an imagene')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
        });

    obliterate
        .command('repository')
        .description('obliterate a repository')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
        });

    obliterate
        .command('webhook')
        .description('obliterate an webhook')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
        });

    obliterate
        .command('project')
        .description('obliterate a project')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
        });

    obliterate
        .command('secret')
        .description('obliterate a secret')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
        });

    obliterate
        .command('trigger')
        .description('obliterate a trigger')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
        });

    obliterate
        .command('deployer')
        .description('obliterate a deployer')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
            console.log('id', options.id);
        });

    obliterate
        .command('builds')
        .description('obliterate the builds')
        .action(async (options: any) => {
        });

    obliterate
        .command('deploys')
        .description('obliterate the deploys')
        .action(async (options: any) => {
        });

    return obliterate;
}
// #endregion module



// #region exports
export default makeObliterateCommand;
// #endregion exports
