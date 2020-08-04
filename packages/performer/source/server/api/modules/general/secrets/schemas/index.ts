import gql from 'graphql-tag';



export default gql`
    extend type Mutation {
        storeSecret(input: InputStoreSecret!): Response!
        obliterateSecret(input: InputValueString!): Response!
        generateSecretsKeychain(input: InputSecretsKeychain!): Response!
    }

    type Secret {
        name: String!
        project: String!
    }

    # inputs
    input InputSecretsKeychain {
        name: String!
    }

    input InputStoreSecret {
        name: String!
        value: String!
        project: String!
    }
`;
