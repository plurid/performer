import gql from 'graphql-tag';



export const GET_SETUP = gql`
    query GetSetup {
        getSetup {
            status
            errors {
                type
                path
                message
            }
            data {
                webhooks {
                    id
                    path
                    provider
                }
                triggers {
                    id
                    name
                    repository
                    path
                    branch
                }
                repositories {
                    id
                }
                builds {
                    id
                }
                providers
            }
        }
    }
`;
