// #region imports
    // #region libraries
    import http from 'http';

    import {
        Application,
    } from 'express';

    import {
        ApolloServer,
    } from '@apollo/server';

    import { expressMiddleware } from '@apollo/server/express4';

    import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

    import {
        ApolloServerPluginLandingPageLocalDefault,
        ApolloServerPluginLandingPageProductionDefault,
    } from '@apollo/server/plugin/landingPage/default';
    // #endregion libraries


    // #region external
    import {
        Context,
        PerformerLogic,
    } from '~server/data/interfaces';

    import {
        GRAPHQL_FAVICON,
        GRAPHQL_TITLE,
        GRAPHQL_ENDPOINT,

        CUSTOM_LOGIC_USAGE,
        PRIVATE_USAGE,

        logLevel,
        logLevels,
    } from '~server/data/constants';

    import {
        resolvers,
        schemas,
    } from '~server/api';

    import loadData from '~server/logic/loader';

    import defaultLogger from '~server/services/logger';

    import {
        getPrivateOwner,
    } from '~server/logic/privateUsage';

    import {
        handleWebhooks,
    } from '~server/logic/webhooks';

    import environment from '~kernel-services/utilities/environment';
    // #endregion external
// #endregion imports



// #region module
const setupGraphQLServer = async (
    instance: Application,
    logic?: PerformerLogic,
) => {
    const playground = {
        faviconUrl: GRAPHQL_FAVICON,
        title: GRAPHQL_TITLE,
    };

    const customLogicUsage = CUSTOM_LOGIC_USAGE;
    const privateUsage = PRIVATE_USAGE;

    const logger = customLogicUsage && logic
        ? logic.logger
        : defaultLogger;

    const httpServer = http.createServer(instance);

    const graphQLServer = new ApolloServer({
        typeDefs: schemas,
        resolvers,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            environment.production
                ? ApolloServerPluginLandingPageProductionDefault({})
                // ? {}
                : ApolloServerPluginLandingPageLocalDefault({}),
        ],
    });

    const context = async ({
        req,
        res,
    }: any) => {
        const {
            providers,
            imagenes,
            notifiers,
            repositories,
            webhooks,
            projects,
            secrets,
            triggers,
            deployers,
            builds,
            deploys,
        } = await loadData();

        handleWebhooks(
            webhooks,
            instance,
        );

        const privateOwnerIdentonym = privateUsage
            ? getPrivateOwner(req)
            : '';

        const context: Context = {
            request: req,
            response: res,

            instance,

            providers,
            imagenes,
            notifiers,
            repositories,
            webhooks,
            projects,
            secrets,
            triggers,
            deployers,
            builds,
            deploys,

            customLogicUsage,

            privateUsage,
            privateOwnerIdentonym,

            logger,
            logLevel,
            logLevels,
        };

        return context;
    };

    await graphQLServer.start();

    instance.use(
        GRAPHQL_ENDPOINT,
        expressMiddleware(graphQLServer, {
            context,
        }),
    );
}
// #endregion module



// #region exports
export default setupGraphQLServer;
// #endregion exports
