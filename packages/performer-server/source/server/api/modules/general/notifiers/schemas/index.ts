// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        getNotifiers: ResponseNotifiers!
    }
`;


export const mutations = gql`
    extend type Mutation {
        setupNotifier(input: InputSetupNotifier!): Response!
        updateNotifier(input: InputUpdateNotifier!): Response!
        obliterateNotifier(input: InputValueString!): Response!
    }
`;


export const types = gql`
    type ResponseNotifiers {
        status: Boolean!
        error: Error
        data: [Notifier!]
    }

    type Notifier {
    }
`;


export const inputs = gql`
    input InputSetupNotifier {
    }

    input InputUpdateNotifier {
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
