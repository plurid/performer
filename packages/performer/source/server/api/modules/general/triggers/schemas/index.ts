import gql from 'graphql-tag';



export const queries = gql`
    extend type Query {
        getTriggers: ResponseTriggers!
    }
`;


export const mutations = gql`
    extend type Mutation {
        addTrigger(input: InputAddTrigger!): Response!
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
    }
`;


export const inputs = gql`
    input InputAddTrigger {
        id: String
        name: String!
        repository: String!
        branch: String!
        path: String!
        file: String!
    }
`;


export default gql`
    ${queries}
    ${mutations}
    ${types}
    ${inputs}
`;
