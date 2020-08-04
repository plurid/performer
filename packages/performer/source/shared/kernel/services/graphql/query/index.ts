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
                repositories {
                    id
                    name
                    isPrivate
                }
                webhooks {
                    id
                    path
                    provider
                }
                projects {
                    id
                    name
                }
                secrets {
                    id
                    name
                    project
                }
                triggers {
                    id
                    name
                    project
                    repository
                    branch
                    path
                    file
                }
                builds {
                    id
                    status
                    trigger
                    time
                    date
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
                build {
                    status
                    trigger
                    time
                    date
                    stages
                }
                results {
                    name
                    data
                }
            }
        }
    }
`;
