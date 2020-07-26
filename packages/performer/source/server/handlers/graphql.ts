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
    Repository,
    Webhook,
    Trigger,
    Build,
} from '#server/data/interfaces';



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
            const repositories: Repository[] = [];
            const webhooks: Webhook[] = [];
            const triggers: Trigger[] = [];
            const builds: Build[] = [];

            return {
                request: req,
                response: res,
                instance,
                repositories,
                webhooks,
                triggers,
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
