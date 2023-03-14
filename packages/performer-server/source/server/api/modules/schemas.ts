// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries


    // #region internal
    import General from './general/schemas';
    // #endregion internal
// #endregion imports



// #region module
const baseSchema = gql`
    # default
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }


    # extras

    # types
    type Response {
        status: Boolean!
        error: Error
    }

    type Error {
        path: String!
        type: String!
        message: String!
    }


    # inputs
    input InputValueString {
        value: String!
    }


    # scalars
    scalar Date
`;


const schemas = [
    baseSchema,

    ...General,
];
// #endregion module



// #region exports
export default schemas;
// #endregion exports
