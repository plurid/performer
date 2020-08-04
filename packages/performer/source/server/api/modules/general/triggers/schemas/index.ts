import gql from 'graphql-tag';



export const queries = gql`
    extend type Query {
        getTriggers: ResponseTriggers!
    }
`;


export const mutations = gql`
    extend type Mutation {
        generateTrigger(input: InputGenerateTrigger!): Response!
        obliterateTrigger(input: InputValueString!): Response!
    }
`;


export const types = gql`
    type ResponseTriggers {
        status: Boolean!
        error: Error
        data: [Trigger!]
    }

    type Trigger {
        id: String!
        name: String!
        repository: String!
        branch: String!
        path: String!
        file: String!
        project: String!
    }
`;


export const inputs = gql`
    input InputGenerateTrigger {
        id: String
        name: String!
        repository: String!
        branch: String!
        path: String!
        file: String!
        project: String!
    }
`;


export default gql`
    ${queries}
    ${mutations}
    ${types}
    ${inputs}
`;
