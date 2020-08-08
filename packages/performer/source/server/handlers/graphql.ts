import {
    Express,
} from 'express';

import {
    ApolloServer,
} from 'apollo-server-express';

import {
    resolvers,
    schemas,
} from '#server/api';

import {
    Context,
} from '#server/data/interfaces';

import loadData from '#server/logic/loader';

import {
    handleWebhooks,
} from '#server/logic/webhooks';



const setupGraphQLServer = async (
    instance: Express,
) => {
    const playground = {
        faviconUrl: '/favicon.ico',
        title: 'API · performer',
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
            };

            return context;
        },
    });

    graphQLServer.applyMiddleware({
        app: instance,
        path: '/perform',
    });
}


export default setupGraphQLServer;
