// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        getImagenes: ResponseImagenes!
    }
`;


export const mutations = gql`
    extend type Mutation {
        addImagene(input: InputAddImagene!): Response!
        obliterateImagene(input: InputValueString!): Response!
    }
`;


export const types = gql`
    type ResponseImagenes {
        status: Boolean!
        error: Error
        data: [Imagene!]
    }

    type Imagene {
        id: String!
        name: String!
        version: String!
        size: Int!
    }
`;


export const inputs = gql`
    input InputAddImagene {
        name: String!
        version: String!
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
