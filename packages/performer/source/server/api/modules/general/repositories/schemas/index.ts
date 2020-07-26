import gql from 'graphql-tag';



export const queries = gql`
    extend type Query {
        getRepositories: Response!
    }
`;


export const mutations = gql`
    extend type Mutation {
        linkRepository(input: InputLinkRepository!): Response!
    }
`;


export const inputs = gql`
    input InputLinkRepository {
        url: String!
    }
`;


export default gql`
    ${queries}
    ${mutations}
    ${inputs}
`;
