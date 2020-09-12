// #region imports
    // #region libraries
    import {
        CommanderStatic,
    } from 'commander';
    // #endregion libraries


    // #region external
    import {
        generateProject,
        generateTrigger,
        generateDeployer,
    } from '../../commands';
    // #endregion external
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
            await generateProject(
                options.name,
            );
        });

    generate
        .command('trigger')
        .description('generate a trigger')
        .option(
            '-i, --id <id>',
            'id',
        )
        .requiredOption(
            '-n, --name <name>',
            'name',
        )
        .requiredOption(
            '-p, --project <project>',
            'projeect',
        )
        .requiredOption(
            '-r, --repository <repository>',
            'repository',
        )
        .requiredOption(
            '-b, --branch <branch>',
            'branch',
        )
        .requiredOption(
            '-h, --path <path>',
            'path',
        )
        .requiredOption(
            '-f, --file <file>',
            'file',
        )
        .action(async (options: any) => {
            const {
                id,
                name,
                project,
                repository,
                branch,
                path,
                file,
            } = options;

            await generateTrigger(
                id,
                name,
                project,
                repository,
                branch,
                path,
                file,
            );
        });

    generate
        .command('deployer')
        .description('generate a deployer')
        .option(
            '-i, --id <id>',
            'id',
        )
        .requiredOption(
            '-n, --name <name>',
            'name',
        )
        .requiredOption(
            '-p, --project <project>',
            'projeect',
        )
        .requiredOption(
            '-r, --repository <repository>',
            'repository',
        )
        .requiredOption(
            '-b, --branch <branch>',
            'branch',
        )
        .requiredOption(
            '-h, --path <path>',
            'path',
        )
        .requiredOption(
            '-f, --file <file>',
            'file',
        )
        .action(async (options: any) => {
            const {
                id,
                name,
                project,
                repository,
                branch,
                path,
                file,
            } = options;

            await generateDeployer(
                id,
                name,
                project,
                repository,
                branch,
                path,
                file,
            );
        });

    return generate
}
// #endregion module



// #region exports
export default makeGenerateCommand;
// #endregion exports
