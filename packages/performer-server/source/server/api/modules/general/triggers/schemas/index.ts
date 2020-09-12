// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        getTriggers: ResponseTriggers!
    }
`;


export const mutations = gql`
    extend type Mutation {
        generateTrigger(input: InputGenerateTrigger!): ResponseTrigger!
        updateTrigger(input: InputGenerateTrigger!): ResponseTrigger!
        obliterateTrigger(input: InputValueString!): Response!
    }
`;


export const types = gql`
    type ResponseTrigger {
        status: Boolean!
        error: Error
        data: Trigger
    }

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
// #endregion module



// #region exports
export default gql`
    ${queries}
    ${mutations}
    ${types}
    ${inputs}
`;
// #endregion exports
