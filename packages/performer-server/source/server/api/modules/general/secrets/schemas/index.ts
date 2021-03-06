// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const mutations = gql`
    extend type Mutation {
        storeSecret(input: InputStoreSecret!): ResponseSecret!
        obliterateSecret(input: InputValueString!): Response!
    }
`;


export const types = gql`
    type ResponseSecret {
        status: Boolean
        error: Error
        data: Secret
    }

    type Secret {
        id: String!
        name: String!
        project: String!
        startsWith: String!
    }
`;


export const inputs = gql`
    input InputStoreSecret {
        name: String!
        value: String!
        project: String!
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
