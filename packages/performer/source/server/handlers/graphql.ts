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



const setupGraphQLServer = (
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
        context: ({
            req,
            res,
        }: any) => {
            /** TODO
             * load already registered elements
             */
            const repositories: any[] = [];
            const triggers: any[] = [];
            const webhooks: any[] = [];
            const builds: any[] = [];

            return {
                request: req,
                response: res,
                instance,
                repositories,
                triggers,
                webhooks,
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
