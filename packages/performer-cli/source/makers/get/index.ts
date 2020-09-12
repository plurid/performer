// #region imports
    // #region libraries
    import {
        CommanderStatic,
    } from 'commander';
    // #endregion libraries


    // #region external
    import {
        getEntities,
    } from '../../commands';
    // #endregion external
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
        .command('providers')
        .description('get the providers')
        .action(async () => {
            await getEntities('providers');
        });

    get
        .command('imagenes')
        .description('get the imagenes')
        .action(async () => {
            await getEntities('imagenes');
        });

    get
        .command('repositories')
        .description('get the repositories')
        .action(async () => {
            await getEntities('repositories');
        });

    get
        .command('webhooks')
        .description('get the webhooks')
        .action(async () => {
            await getEntities('webhooks');
        });

    get
        .command('projects')
        .description('get the projects')
        .action(async () => {
            await getEntities('projects');
        });

    get
        .command('secrets')
        .description('get the secrets')
        .action(async () => {
            await getEntities('secrets');
        });

    get
        .command('triggers')
        .description('get the triggers')
        .action(async () => {
            await getEntities('triggers');
        });

    get
        .command('deployers')
        .description('get the deployers')
        .action(async () => {
            await getEntities('deployers');
        });

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
        .command('builds')
        .description('get the builds')
        .action(async () => {
            await getEntities('builds');
        });

    get
        .command('build')
        .description('get a deploy')
        .requiredOption(
            '-i, --id <id>',
            'id',
        )
        .action(async (options: any) => {
            console.log('id', options.id);
        });

    get
        .command('deploys')
        .description('get the deploys')
        .action(async () => {
            await getEntities('deploys');
        });

    return get;
}
// #endregion module



// #region exports
export default makeGetCommand;
// #endregion exports
