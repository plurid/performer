import {
    ApolloServer,
} from 'apollo-server-express';

import {
    resolvers,
    schemas,
} from '#server/api';



const setupGraphQLServer = (
    instance: any,
) => {
    const playground = {
        faviconUrl: '/favicon.ico',
        title: 'API · performer',
    };

    const graphQLServer = new ApolloServer({
        typeDefs: schemas,
        resolvers,
        playground,
    });

    graphQLServer.applyMiddleware({
        app: instance,
        path: '/perform',
    });
}


export default setupGraphQLServer;
