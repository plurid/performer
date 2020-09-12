// #region imports
    // #region libraries
    import fetch from 'cross-fetch';

    import {
        ApolloClient,
        HttpLink,
        ApolloLink,
        createHttpLink,
        InMemoryCache,
        from,
    } from '@apollo/client';
    // #endregion libraries
// #endregion imports



// #region module
const client = (
    uri: string,
    cookie?: string,
) => {
    const httpLink = new HttpLink({
        uri,
        credentials: 'include',
        fetch,
        headers: {
            Cookie: cookie,
        },
    });

    const afterwareLink = new ApolloLink((operation, forward) => {
        return forward(operation).map(response => {
            const context = operation.getContext()
            const {
                response: { headers },
            } = context;

            console.log(headers);

            // if (headers) {
            //     const refreshToken = headers.get('refreshToken')
            //     if (refreshToken) {
            //     localStorage.setItem(AUTH_TOKEN, refreshToken)
            //     }
            // }

            return response
        });
    })

    return new ApolloClient({
        link: from([
            afterwareLink,
            httpLink,
        ]),
        // link: createHttpLink({
        //     uri,
        //     credentials: 'include',
        //     fetch,
        //     headers: {
        //         Cookie: cookie,
        //     },
        // }),
        cache: new InMemoryCache(),
    });
};
// #endregion module



// #region exports
export default client;
// #endregion exports
