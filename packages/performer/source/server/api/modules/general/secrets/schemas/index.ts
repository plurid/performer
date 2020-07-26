import gql from 'graphql-tag';



export default gql`
    extend type Query {
        getSecret: ResponseSecret!
    }

    extend type Mutation {
        generateSecretsKeychain(input: InputSecretsKeychain!): Response!
    }


    # types
    type ResponseSecret {
        status: Boolean!
        error: Error
        data: String
    }


    # inputs
    input InputSecretsKeychain {
        name: String!
    }
`;
