import gql from 'graphql-tag';



export const queries = gql`
    extend type Query {
        getSetup: ResponseSetup!
    }
`;


export const mutations = gql`
    extend type Mutation {
        setupProvider(input: InputSetupProvider!): ResponseProvider!
        obliterateProvider(input: InputValueString!): Response!
        setupWebhook(input: InputSetupWebhook!): Response!
        obliterateWebhook(input: InputValueString!): Response!
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
        imagenes: [Imagene!]
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
    input InputValueString {
        value: String!
    }

    input InputSetupProvider {
        type: String!
        token: String!
        name: String!
    }

    input InputSetupWebhook {
        providerID: String!
        path: String!
    }
`;



export default gql`
    ${queries}
    ${mutations}
    ${types}
    ${inputs}
`;
