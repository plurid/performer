// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const mutations = gql`
    extend type Mutation {
        setupWebhook(input: InputSetupWebhook!): ResponseWebhook!
        obliterateWebhook(input: InputValueString!): Response!
    }
`;


export const types = gql`
    type ResponseWebhook {
        status: Boolean!
        error: Error
        data: Webhook
    }

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
// #endregion module



// #region exports
export default gql`
    ${mutations}
    ${types}
    ${inputs}
`;
// #endregion exports
