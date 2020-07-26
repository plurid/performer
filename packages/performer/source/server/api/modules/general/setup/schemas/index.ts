import gql from 'graphql-tag';



export const queries = gql`
    extend type Query {
        getSetup: ResponseSetup!
    }
`;


export const mutations = gql`
    extend type Mutation {
        setupProvider(input: InputSetupProvider!): Response!
        setupWebhook(input: InputSetupWebhook!): Response!
    }
`;


export const types = gql`
    type ResponseSetup {
        status: Boolean!
        error: Error
        data: Setup
    }

    type Setup {
        webhooks: [Webhook!]
        triggers: [Trigger!]
        repositories: [Repository!]
        builds: [Build!]
        providers: [String!]
    }

    type Webhook {
        id: String!
        path: String!
        provider: String!
    }
`;


export const inputs = gql`
    input InputSetupProvider {
        token: String!
    }

    input InputSetupWebhook {
        path: String!
        provider: String!
    }
`;



export default gql`
    ${queries}
    ${mutations}
    ${types}
    ${inputs}
`;
