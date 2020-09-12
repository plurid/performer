import program, {
    CommanderStatic,
} from 'commander';

import {
    status,
    login,
    logout,
} from '../commands';

import {
    makeAddCommand,
    makeLinkCommand,
    makeSetupCommand,
    makeStoreCommand,
    makeGenerateCommand,
    makeGetCommand,
} from '../makers';



const main = async (
    program: CommanderStatic,
) => {
    program
        .storeOptionsAsProperties(false)
        .passCommandToAction(false);

    program
        .name('performer')
        .usage('<command>')
        .version('0.0.0', '-v, --version')
        .action(() => {
            program.outputHelp();
        });


    program
        .command('status')
        .description('show the connection status')
        .action(async () => {
            console.log('Logged in the performer server.');
        });

    program
        .command('login')
        .description('login into a performer server using the identonym and the key')
        .requiredOption(
            '-s, --server <server>',
            'server address',
        )
        .requiredOption(
            '-i, --identonym <identonym>',
            'identonym',
        )
        .requiredOption(
            '-k, --key <key>',
            'key',
        )
        .action(async (options: any) => {
            console.log('server', options.server);
            console.log('identonym', options.identonym);
            console.log('key', options.key);
            console.log('Logged in the performer server.');
        });

    program
        .command('logout')
        .description('log out of the performer server')
        .action(async () => {
            console.log('Logged out of the performer server.');
        });


    program.addCommand(
        makeAddCommand(program)
    );

    program.addCommand(
        makeLinkCommand(program)
    );

    program.addCommand(
        makeSetupCommand(program)
    );

    program.addCommand(
        makeStoreCommand(program)
    );

    program.addCommand(
        makeGenerateCommand(program)
    );

    program.addCommand(
        makeGetCommand(program)
    );


    program.parseAsync(process.argv);
}


const cli = () => {
    main(program);
}


export default cli;
