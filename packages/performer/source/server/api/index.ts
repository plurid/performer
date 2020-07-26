import gql from 'graphql-tag';



export const queries = gql`
    extend type Query {
        getTriggers: ResponseTriggers!
        getSecret: ResponseSecret!
        getBuilds: ResponseBuilds!
        getBuild(input: InputGetBuild!): ResponseBuild!
    }
`;


export const mutations = gql`
    extend type Mutation {
        setupWebhook(input: InputSetupWebhook!): Response!
        linkRepository(input: InputLinkRepository!): Response!
        addTrigger(input: InputAddTrigger!): Response!
        generateSecretsKeychain(input: InputSecretsKeychain!): Response!
    }
`;


export const types = gql`
    type Response {
        status: Boolean!
        error: Error!
    }

    type Error {
        path: String!
        type: String!
        message: String!
    }

    type ResponseTriggers {
        status: Boolean!
        error: Error!
        data: [Trigger]!
    }

    type Trigger {
        id: String!
        name: String!
        repository: String!
        path: String!
    }

    type ResponseSecret {
        status: Boolean!
        error: Error!
        data: String
    }

    type ResponseBuilds {
        status: Boolean!
        error: Error!
        data: [Build]!
    }

    type ResponseBuild {
        status: Boolean!
        error: Error!
        data: Build!
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

    input InputLinkRepository {
        url: String!
    }

    input InputAddTrigger {
        id: String
        name: String!
        repository: String!
        path: String!
    }

    input InputSecretsKeychain {
        name: String!
    }

    input InputGetBuild {
        id: String!
    }
`;
