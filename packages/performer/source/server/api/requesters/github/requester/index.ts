import fetch from 'cross-fetch';

import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';

import {
    GITHUB_GRAPHQL_API,
    GITHUB_GRAPHQL_TOKEN,
} from '#server/data/constants';



export const requester = (
    token: string,
) => new ApolloClient({
    link: createHttpLink({
        uri: GITHUB_GRAPHQL_API,
        credentials: 'include',
        fetch,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }),
    cache: new InMemoryCache(),
});


const client = requester(GITHUB_GRAPHQL_TOKEN);


export default client;
