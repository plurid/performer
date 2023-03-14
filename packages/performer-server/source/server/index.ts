// #region imports
    // #region libraries
    import {
        ApolloProvider,
    } from '@apollo/client';

    import {
        Provider as ReduxProvider,
    } from 'react-redux';


    import PluridServer, {
        PluridServerMiddleware,
        PluridServerService,
        PluridServerPartialOptions,
        PluridServerTemplateConfiguration,
    } from '@plurid/plurid-react-server';
    // #endregion libraries


    // #region external
    import {
        routes,
        shell,
    } from '../shared';

    import helmet from '~kernel-services/helmet';

    import reduxStore from '~kernel-services/state/store';
    import reduxContext from '~kernel-services/state/context';
    import apolloClient from '~kernel-services/graphql/client';
    // #endregion external


    // #region internal
    import {
        PerformerLogic,
    } from './data/interfaces';

    import preserves from './preserves';

    import setupHandlers from './handlers';

    import logger from './services/logger';

    import mockLogic from './logic/mock';
    // #endregion internal
// #endregion imports



// #region module
// #region constants
/** ENVIRONMENT */
const watchMode = process.env.PLURID_WATCH_MODE === 'true';
const isProduction = process.env.ENV_MODE === 'production';
const buildDirectory = process.env.PLURID_BUILD_DIRECTORY || 'build';
const port = process.env.PORT || 56065;

const applicationRoot = 'performer-application';
const openAtStart = watchMode
    ? false
    : isProduction
        ? false
        : true;
const debug = isProduction
    ? 'info'
    : 'error';


/** Custom styles to be loaded into the template. */
const styles: string[] = [
    //
];


/** Express-like middleware. */
const middleware: PluridServerMiddleware[] = [
    //
];


/** Services to be used in the application. */
const services: PluridServerService[] = [
    {
        name: 'Apollo',
        Provider: ApolloProvider,
        properties: {
            client: apolloClient,
        },
    },
    {
        name: 'Redux',
        Provider: ReduxProvider,
        properties: {
            store: reduxStore({}),
            context: reduxContext,
        },
    },
];


const options: PluridServerPartialOptions = {
    serverName: 'Performer Server',
    buildDirectory,
    open: openAtStart,
    debug,
    ignore: [
        '/perform',
    ],
    hostname: `localhost:${port}`,
};

const template: PluridServerTemplateConfiguration = {
    root: applicationRoot,
};
// #endregion constants


// #region server
const performerServer = new PluridServer({
    helmet,
    routes,
    preserves,
    shell,
    styles,
    middleware,
    services,
    options,
    template,
});


const performerSetup = (
    logic?: PerformerLogic,
) => {
    setupHandlers(
        performerServer,
        logic,
    );
}
// #endregion server
// #endregion module



// #region run
/**
 * If the file is called directly, as in `node build/index.js`,
 * it will run the server.
 *
 * The check is in place so that the server can also be imported
 * for programmatic usage.
 */
if (require.main === module) {
    performerSetup(
        // mockLogic,
    );

    performerServer.start(port);

    logger.log(
        'performer :: server started',
    );
}
// #endregion run



// #region exports
export {
    performerSetup,
};

export default performerServer;
// #endregion exports
