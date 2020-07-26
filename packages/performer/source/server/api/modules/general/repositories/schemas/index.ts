import gql from 'graphql-tag';



export default gql`
    extend type Query {
        getRepositories: Response!
    }

    extend type Mutation {
        linkRepository(input: InputLinkRepository!): Response!
    }

    input InputLinkRepository {
        url: String!
    }
`;
