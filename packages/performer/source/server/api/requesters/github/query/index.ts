import {
    gql,
} from 'apollo-server-express';



export const VIEWER_LOGIN = gql`
    query {
        viewer {
            login
        }
    }
`;
