// #region imports
    // #region libraries
    import {
        CommanderStatic,
    } from 'commander';
    // #endregion libraries


    // #region external
    import {
        obliterateEntity,
        obliterateEntities,
    } from '../../commands';
    // #endregion external
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
            await obliterateEntity(
                'provider',
                options.id,
            );
        });

    obliterate
        .command('imagene')
        .description('obliterate an imagene')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
            await obliterateEntity(
                'imagene',
                options.id,
            );
        });

    obliterate
        .command('repository')
        .description('obliterate a repository')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
            await obliterateEntity(
                'repository',
                options.id,
            );
        });

    obliterate
        .command('webhook')
        .description('obliterate an webhook')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
            await obliterateEntity(
                'webhook',
                options.id,
            );
        });

    obliterate
        .command('project')
        .description('obliterate a project')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
            await obliterateEntity(
                'project',
                options.id,
            );
        });

    obliterate
        .command('secret')
        .description('obliterate a secret')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
            await obliterateEntity(
                'secret',
                options.id,
            );
        });

    obliterate
        .command('trigger')
        .description('obliterate a trigger')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
            await obliterateEntity(
                'trigger',
                options.id,
            );
        });

    obliterate
        .command('deployer')
        .description('obliterate a deployer')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
            await obliterateEntity(
                'deployer',
                options.id,
            );
        });

    obliterate
        .command('builds')
        .description('obliterate the builds')
        .action(async () => {
            await obliterateEntities(
                'builds',
            );
        });

    obliterate
        .command('deploys')
        .description('obliterate the deploys')
        .action(async () => {
            await obliterateEntities(
                'deploys',
            );
        });

    return obliterate;
}
// #endregion module



// #region exports
export default makeObliterateCommand;
// #endregion exports
