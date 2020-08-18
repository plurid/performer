// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports




export default gql`
    extend type Mutation {
        storeSecret(input: InputStoreSecret!): Response!
        obliterateSecret(input: InputValueString!): Response!
    }


    # types
    type Secret {
        id: String!
        name: String!
        project: String!
        startsWith: String!
    }


    # inputs
    input InputStoreSecret {
        name: String!
        value: String!
        project: String!
    }
`;
