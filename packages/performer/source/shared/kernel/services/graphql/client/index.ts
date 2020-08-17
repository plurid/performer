import fetch from 'cross-fetch';

import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';

import {
    GRAPHQL_ENDPOINT,
} from '#server/data/constants'



const client = new ApolloClient({
    link: createHttpLink({
        uri: GRAPHQL_ENDPOINT,
        credentials: 'include',
        fetch,
    }),
    cache: new InMemoryCache(),
});


export default client;
