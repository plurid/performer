import gql from 'graphql-tag';



export const queries = gql`
    extend type Query {
        getBuilds: ResponseBuilds!
        getBuild(input: InputGetBuild!): ResponseBuild!
        getBuildLogs(input: InputValueString!): ResponseBuidlLogs!
    }
`;


export const mutations = gql`
    extend type Mutation {
        clearBuilds: Response!
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

    type ResponseBuidlLogs {
        status: Boolean!
        error: Error
        data: ResponseBuidlLogsData
    }

    type ResponseBuidlLogsData {
        build: Build!
        results: [BuildLog!]
    }

    type Build {
        id: ID!
        status: String!
        trigger: String!
        time: Int!
        date: Int!
        stages: [String!]
        project: String!
    }

    type BuildLog {
        name: String!
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
    ${mutations}
    ${types}
    ${inputs}
`;
