import gql from 'graphql-tag';



export const queries = gql`
    extend type Query {
        getSetup: ResponseSetup!
    }
`;


export const types = gql`
    type ResponseSetup {
        status: Boolean!
        error: Error
        data: Setup
    }

    type Setup {
        providers: [Provider!]
        imagenes: [Imagene!]
        repositories: [Repository!]
        webhooks: [Webhook!]
        projects: [Project!]
        secrets: [Secret!]
        triggers: [Trigger!]
        deployers: [Deployer!]
        builds: [Build!]
        deploys: [Deploy!]
    }
`;



export default gql`
    ${queries}
    ${types}
`;
