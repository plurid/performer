// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const SETUP_PROVIDER = gql`
    mutation SetupProvider($input: InputSetupProvider!) {
        setupProvider(input: $input) {
            status
            error {
                type
                path
                message
            }
            data
        }
    }
`;

export const OBLITERATE_PROVIDER = gql`
    mutation ObliterateProvider($input: InputValueString!) {
        obliterateProvider(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;


export const LINK_REPOSITORY = gql`
    mutation LinkRepository($input: InputLinkRepository!) {
        linkRepository(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;

export const UNLINK_REPOSITORY = gql`
    mutation UnlinkRepository($input: InputValueString!) {
        unlinkRepository(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;


export const SETUP_WEBHOOK = gql`
    mutation SetupWebhook($input: InputSetupWebhook!) {
        setupWebhook(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;

export const OBLITERATE_WEBHOOK = gql`
    mutation ObliterateWebhook($input: InputValueString!) {
        obliterateWebhook(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;


export const GENERATE_PROJECT = gql`
    mutation GenerateProject($input: InputGenerateProject!) {
        generateProject(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;


export const OBLITERATE_PROJECT = gql`
    mutation ObliterateProject($input: InputValueString!) {
        obliterateProject(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;


export const STORE_SECRET = gql`
    mutation StoreSecret($input: InputStoreSecret!) {
        storeSecret(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;


export const OBLITERATE_SECRET = gql`
    mutation ObliterateSecret($input: InputValueString!) {
        obliterateSecret(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;


export const GENERATE_TRIGGER = gql`
    mutation GenerateTrigger($input: InputGenerateTrigger!) {
        generateTrigger(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;


export const OBLITERATE_TRIGGER = gql`
    mutation ObliterateTrigger($input: InputValueString!) {
        obliterateTrigger(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;


export const GENERATE_DEPLOYER = gql`
    mutation GenerateDeployer($input: InputGenerateDeployer!) {
        generateDeployer(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;


export const OBLITERATE_DEPLOYER = gql`
    mutation ObliterateDeployer($input: InputValueString!) {
        obliterateDeployer(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;



export const LOGIN = gql`
    mutation Login($input: InputLogin!) {
        login(input: $input) {
            status
            error {
                type
                path
                message
            }
            data {
                id
            }
        }
    }
`;


export const LOGOUT = gql`
    mutation Logout {
        logout {
            status
            error {
                type
                path
                message
            }
        }
    }
`;
// #endregion module
