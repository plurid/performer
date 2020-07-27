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
                repositories,
                webhooks,
                triggers,
                builds,
            } = await loadData();

            handleWebhooks(
                webhooks,
                instance,
            );

            const context: Context = {
                request: req,
                response: res,
                instance,
                webhooks,
                triggers,
                repositories,
                builds,
                providers,
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
