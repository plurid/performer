import gql from 'graphql-tag';



export default gql`
    extend type Query {
        getTriggers: ResponseTriggers!
    }

    extend type Mutation {
        addTrigger(input: InputAddTrigger!): Response!
    }


    # types
    type ResponseTriggers {
        status: Boolean!
        error: Error
        data: [Trigger!]
    }

    type Trigger {
        id: String!
        name: String!
        repository: String!
        path: String!
    }


    # inputs
    input InputAddTrigger {
        id: String
        name: String!
        repository: String!
        path: String!
    }
`;
