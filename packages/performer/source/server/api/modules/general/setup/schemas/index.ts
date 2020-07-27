import gql from 'graphql-tag';



export const queries = gql`
    extend type Query {
        getSetup: ResponseSetup!
    }
`;


export const mutations = gql`
    extend type Mutation {
        setupProvider(input: InputSetupProvider!): ResponseProvider!
        setupWebhook(input: InputSetupWebhook!): Response!
    }
`;


export const types = gql`
    type ResponseSetup {
        status: Boolean!
        error: Error
        data: Setup
    }

    type ResponseProvider {
        status: Boolean!
        error: Error
        data: String
    }

    type Setup {
        providers: [Provider!]
        repositories: [Repository!]
        webhooks: [Webhook!]
        triggers: [Trigger!]
        builds: [Build!]
    }

    type Webhook {
        id: String!
        path: String!
        provider: String!
    }

    type Provider {
        id: ID!
        name: String!
        type: String!
    }
`;


export const inputs = gql`
    input InputSetupProvider {
        provider: String!
        token: String!
        name: String!
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
