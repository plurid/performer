import gql from 'graphql-tag';



export const mutations = gql`
    extend type Mutation {
        setupWebhook(input: InputSetupWebhook!): Response!
        obliterateWebhook(input: InputValueString!): Response!
    }
`;


export const types = gql`
    type Webhook {
        id: String!
        path: String!
        provider: String!
    }
`;


export const inputs = gql`
    input InputSetupWebhook {
        providerID: String!
        path: String!
    }
`;



export default gql`
    ${mutations}
    ${types}
    ${inputs}
`;
