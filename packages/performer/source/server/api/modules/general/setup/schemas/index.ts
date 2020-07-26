import gql from 'graphql-tag';



export const queries = gql`
    extend type Query {
        getSetup: ResponseSetup!
    }
`;


export const mutations = gql`
    extend type Mutation {
        initialSetup(input: InputInitialSetup!): Response!
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
        data: String!
    }
`;


export const inputs = gql`
    input InputInitialSetup {
        data: String!
    }

    input InputSetupWebhook {
        path: String!
        type: String!
    }
`;



export default gql`
    ${queries}
    ${mutations}
    ${types}
    ${inputs}
`;
