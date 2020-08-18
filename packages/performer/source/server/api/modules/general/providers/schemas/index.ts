import gql from 'graphql-tag';



export const mutations = gql`
    extend type Mutation {
        setupProvider(input: InputSetupProvider!): ResponseProvider!
        obliterateProvider(input: InputValueString!): Response!
    }
`;


export const types = gql`
    type ResponseProvider {
        status: Boolean!
        error: Error
        data: String
    }

    type Provider {
        id: ID!
        name: String!
        type: String!
    }
`;


export const inputs = gql`
    input InputSetupProvider {
        type: String!
        token: String!
        name: String!
    }
`;



export default gql`
    ${mutations}
    ${types}
    ${inputs}
`;
