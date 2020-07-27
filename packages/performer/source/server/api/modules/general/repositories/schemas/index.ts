import gql from 'graphql-tag';



export const queries = gql`
    extend type Query {
        getRepositories: ResponseRepositories!
        getProviderRepositories(input: InputGetProviderRepositories!): ResponseRepositories!
    }
`;


export const mutations = gql`
    extend type Mutation {
        linkRepository(input: InputLinkRepository!): Response!
    }
`;


export const types = gql`
    type ResponseRepositories {
        status: Boolean!
        error: Error
        data: [Repository!]
    }

    type Repository {
        id: ID!
    }
`;


export const inputs = gql`
    input InputGetProviderRepositories {
        provider: String!
    }

    input InputLinkRepository {
        url: String!
        name: String!
    }
`;


export default gql`
    ${queries}
    ${mutations}
    ${types}
    ${inputs}
`;
