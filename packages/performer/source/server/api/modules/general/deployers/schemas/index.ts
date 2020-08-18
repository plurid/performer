// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        getDeployers: ResponseDeployers!
    }
`;


export const mutations = gql`
    extend type Mutation {
        generateDeployer(input: InputGenerateDeployer!): Response!
        obliterateDeployer(input: InputValueString!): Response!
    }
`;


export const types = gql`
    type ResponseDeployers {
        status: Boolean!
        error: Error
        data: [Deployer!]
    }

    type Deployer {
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
    input InputGenerateDeployer {
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
