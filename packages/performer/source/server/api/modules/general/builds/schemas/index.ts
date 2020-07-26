import gql from 'graphql-tag';



export const queries = gql`
    extend type Query {
        getBuilds: ResponseBuilds!
        getBuild(input: InputGetBuild!): ResponseBuild!
    }
`;


export const mutations = gql`
    extend type Mutation {
        setupWebhook(input: InputSetupWebhook!): Response!
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
        stages: [Stage]!
    }

    type Stage {
        id: ID!
        name: String!
        results: [Result]!
    }

    type Result {
        timestamp: Int!
        data: String!
    }
`;


export const inputs = gql`
    input InputSetupWebhook {
        path: String!
        type: String!
    }

    input InputGetBuild {
        id: String!
    }
`;



export default gql`
    ${queries}
    ${mutations}
    ${types}
    ${inputs}
`;
