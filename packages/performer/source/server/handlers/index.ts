import PluridServer from '@plurid/plurid-react-server';

import {
    ApolloServer,
} from 'apollo-server-express';

import {
    resolvers,
    schemas,
} from '#server/api';



export const setRouteHandlers = (
    server: PluridServer,
) => {
    const handler = server.handle();
    const instance = server.instance();

    handler.post('/service-check/health', (request, response, next) => {
        response.setHeader('Content-Type', 'application/json');
        response.end(
            JSON.stringify(
                { status: true },
            ),
        );
    });


    const graphQLServer = new ApolloServer({
        typeDefs: schemas,
        resolvers,
    });

    graphQLServer.applyMiddleware({
        app: instance,
        path: '/perform',
    });

    // const playground = environment.production
    //     ? undefined
    //     : {
    //         /** HACK to Set-Cookie */
    //         settings: {
    //             'request.credentials': 'include',
    //         },
    //         faviconUrl: '/favicon.ico',
    //         title: 'API · performer',
    //     };

    // const graphQLServer = new ApolloServer({
    //     gateway,
    //     subscriptions: false,
    //     context,
    //     playground,
    // });

    // graphQLServer.applyMiddleware({
    //     app: instance,
    //     path: '/graphql',
    //     cors: false,
    // });
}
