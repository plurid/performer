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


export const QUERY_REPOSITORIES = gql`
    query {
        viewer {
            repositories(
                first: 100,
                ownerAffiliations: [OWNER, ORGANIZATION_MEMBER, COLLABORATOR]
            ) {
                totalCount
                nodes {
                    nameWithOwner
                    databaseId
                    isPrivate
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
`;
