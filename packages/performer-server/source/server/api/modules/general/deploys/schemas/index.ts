// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        getDeploys: ResponseDeploys!
        getDeploy(input: InputGetDeploy!): ResponseDeploy!
        getDeployLogs(input: InputValueString!): ResponseDeployLogs!
    }
`;


export const mutations = gql`
    extend type Mutation {
        clearDeploys: Response!
    }
`;


export const types = gql`
    type ResponseDeploys {
        status: Boolean!
        error: Error
        data: [Deploy!]
    }

    type ResponseDeploy {
        status: Boolean!
        error: Error
        data: Deploy
    }

    type ResponseDeployLogs {
        status: Boolean!
        error: Error
        data: ResponseDeployLogsData
    }

    type ResponseDeployLogsData {
        build: Deploy!
        results: [DeployLog!]
    }

    type Deploy {
        id: ID!
        status: String!
        trigger: String!
        time: Int!
        date: Int!
        stages: [String!]
        project: String!
    }

    type DeployLog {
        name: String!
        data: String!
    }
`;


export const inputs = gql`
    input InputGetDeploy {
        id: String!
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
