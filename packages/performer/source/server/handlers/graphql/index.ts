// #region imports
    // #region libraries
    import {
        Application,
    } from 'express';

    import {
        ApolloServer,
    } from 'apollo-server-express';
    // #endregion libraries


    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        GRAPHQL_FAVICON,
        GRAPHQL_TITLE,
        GRAPHQL_ENDPOINT,

        PRIVATE_USAGE,
    } from '#server/data/constants';

    import {
        resolvers,
        schemas,
    } from '#server/api';

    import loadData from '#server/logic/loader';

    import {
        getPrivateOwner,
    } from '#server/logic/privateUsage';

    import {
        handleWebhooks,
    } from '#server/logic/webhooks';
    // #endregion external
// #endregion imports



// #region module
const setupGraphQLServer = async (
    instance: Application,
) => {
    const playground = {
        faviconUrl: GRAPHQL_FAVICON,
        title: GRAPHQL_TITLE,
    };

    const graphQLServer = new ApolloServer({
        typeDefs: schemas,
        resolvers,
        playground,
        context: async ({
            req,
            res,
        }: any) => {
            const {
                providers,
                imagenes,
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

            const privateOwnerIdentonym = PRIVATE_USAGE
                ? getPrivateOwner(req)
                : '';

            const context: Context = {
                request: req,
                response: res,
                instance,
                providers,
                imagenes,
                repositories,
                webhooks,
                projects,
                secrets,
                triggers,
                deployers,
                builds,
                deploys,
                privateOwnerIdentonym,
            };

            return context;
        },
    });

    graphQLServer.applyMiddleware({
        app: instance,
        path: GRAPHQL_ENDPOINT,
    });
}
// #endregion module



// #region exports
export default setupGraphQLServer;
// #endregion exports
