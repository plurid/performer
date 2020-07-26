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

import loadData from '#server/logic/loader';



const setupGraphQLServer = async (
    instance: Express,
) => {
    const {
        webhooks,
        triggers,
        repositories,
        builds,
    } = await loadData();

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
            return {
                request: req,
                response: res,
                instance,
                webhooks,
                triggers,
                repositories,
                builds,
            };
        },
    });

    graphQLServer.applyMiddleware({
        app: instance,
        path: '/perform',
    });
}


export default setupGraphQLServer;
