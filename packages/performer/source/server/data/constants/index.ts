import path from 'path';



export const GITHUB_API = 'https://api.github.com/graphql';
export const GITHUB_TOKEN = process.env.GITHUB_GRAPHQL_TOKEN || '';
export const GITHUB_PROVIDER = 'github';


export const BITBUCKET_TOKEN = '';
export const BITBUCKET_PROVIDER = 'github';



export const BASE_PATH = process.cwd();
export const BASE_PATH_REPOSITORIES = './data/repositories/';
export const BASE_PATH_REPOSITORIES_METADATA = './data/repositories/metadata/';
export const BASE_PATH_TRIGGERS = './data/triggers/';
export const BASE_PATH_WEBHOOKS = './data/webhooks/';
export const BASE_PATH_BUILDS = './data/builds/';
export const BASE_PATH_BUILDLOGS = './data/buildlogs/';
export const BASE_PATH_BUILDQUEUE = './data/buildqueue/';


export const repositoriesPath = path.join(BASE_PATH, BASE_PATH_REPOSITORIES);
export const repositoriesMetadataPath = path.join(BASE_PATH, BASE_PATH_REPOSITORIES_METADATA);
export const triggersPath = path.join(BASE_PATH, BASE_PATH_TRIGGERS);
export const webhooksPath = path.join(BASE_PATH, BASE_PATH_WEBHOOKS);
export const buildsPath = path.join(BASE_PATH, BASE_PATH_BUILDS);
export const buildlogsPath = path.join(BASE_PATH, BASE_PATH_BUILDLOGS);
export const buildqueuePath = path.join(BASE_PATH, BASE_PATH_BUILDQUEUE);
