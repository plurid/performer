import gql from 'graphql-tag';



export const GET_SETUP = gql`
    query GetSetup {
        getSetup {
            status
            error {
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
                    branch
                    path
                    file
                }
                repositories {
                    id
                    name
                    isPrivate
                }
                builds {
                    id
                    status
                    trigger
                    time
                    date
                }
                providers {
                    id
                    name
                    type
                }
                imagenes {
                    id
                    name
                    version
                    size
                }
            }
        }
    }
`;


export const GET_PROVIDER_REPOSITORIES = gql`
    query GetProviderRepositories($input: InputGetProviderRepositories!) {
        getProviderRepositories(input: $input) {
            status
            data {
                id
                name
                isPrivate
            }
        }
    }
`;


export const GET_BUILD_LOGS = gql`
    query GetBuildLogs($input: InputValueString!) {
        getBuildLogs(input: $input) {
            status
            data {
                name
                data
            }
        }
    }
`;
