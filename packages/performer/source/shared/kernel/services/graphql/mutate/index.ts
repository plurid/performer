import gql from 'graphql-tag';



export const SETUP_CODE_PROVIDER = gql`
    mutation SetupCodeProvider($input: InputSetupCodeProvider!) {
        setupCodeProvider(input: $input) {
            status
            errors {
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
            errors {
                type
                path
                message
            }
        }
    }
`;


export const ADD_TRIGGER = gql`
    mutation AddTrigger($input: InputAddTrigger!) {
        addTrigger(input: $input) {
            status
            errors {
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
            errors {
                type
                path
                message
            }
        }
    }
`;
