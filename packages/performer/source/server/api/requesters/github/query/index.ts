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
            repositories(first: 10) {
                totalCount
                nodes {
                    nameWithOwner
                    name
                    databaseId
                    isPrivate
                    defaultBranchRef {
                        target {
                            ... on Commit {
                                zipballUrl
                            }
                        }
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
`;
