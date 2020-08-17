// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
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
                    endsWith
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
                deployers {
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
                    project
                }
                deploys {
                    id
                    status
                    trigger
                    time
                    date
                    project
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


export const GET_CURRENT_OWNER = gql`
    query GetCurrentOwner {
        getCurrentOwner {
            status
            error {
                path
                type
                message
            }
            data {
                id
            }
        }
    }
`;


export const GET_USAGE_TYPE = gql`
    query GetUsageType {
        getUsageType {
            status
            error {
                path
                type
                message
            }
            data
        }
    }
`;
// #endregion module
