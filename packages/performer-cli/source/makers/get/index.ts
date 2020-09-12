// #region imports
    // #region libraries
    import {
        CommanderStatic,
    } from 'commander';
    // #endregion libraries
// #endregion imports



// #region module
const makeGetCommand = (
    program: CommanderStatic,
) => {
    const get = new program.Command('get');

    get
        .storeOptionsAsProperties(false)
        .passCommandToAction(false)
        .description('get one or more entities');

    get
        .command('build')
        .description('get a build')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
            console.log('id', options.id);
        });

    get
        .command('deployer')
        .description('get a deployer')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
            console.log('id', options.id);
        });

    get
        .command('providers')
        .description('get the providers')
        .action(async (options: any) => {
        });

    get
        .command('imagenes')
        .description('get the imagenes')
        .action(async (options: any) => {
        });

    get
        .command('repositories')
        .description('get the repositories')
        .action(async (options: any) => {
        });

    get
        .command('webhooks')
        .description('get the webhooks')
        .action(async (options: any) => {
        });

    get
        .command('projects')
        .description('get the projects')
        .action(async (options: any) => {
        });

    get
        .command('secrets')
        .description('get the secrets')
        .action(async (options: any) => {
        });

    get
        .command('triggers')
        .description('get the triggers')
        .action(async (options: any) => {
        });

    get
        .command('deployers')
        .description('get the deployers')
        .action(async (options: any) => {
        });

    get
        .command('builds')
        .description('get the builds')
        .action(async (options: any) => {
        });

    get
        .command('deploys')
        .description('get the deploys')
        .action(async (options: any) => {
        });

    return get;
}
// #endregion module



// #region exports
export default makeGetCommand;
// #endregion exports
