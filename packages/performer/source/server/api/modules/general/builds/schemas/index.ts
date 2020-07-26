import gql from 'graphql-tag';



export const queries = gql`
    extend type Query {
        getBuilds: ResponseBuilds!
        getBuild(input: InputGetBuild!): ResponseBuild!
    }
`;


export const types = gql`
    type ResponseBuilds {
        status: Boolean!
        error: Error
        data: [Build!]
    }

    type ResponseBuild {
        status: Boolean!
        error: Error
        data: Build
    }

    type Build {
        id: ID!
        stages: [Stage!]
    }

    type Stage {
        id: ID!
        name: String!
        results: [Result!]
    }

    type Result {
        timestamp: Int!
        data: String!
    }
`;


export const inputs = gql`
    input InputGetBuild {
        id: String!
    }
`;



export default gql`
    ${queries}
    ${types}
    ${inputs}
`;
