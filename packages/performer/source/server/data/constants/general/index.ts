// #region imports
import path from 'path';
// #endregion imports



// #region module
export const COOKIE_PRIVATE_TOKEN = 'PVTTKN';

export const HEALTH_CHECK_ENDPOINT = '/service-check/health';


export const GITHUB_API = 'https://api.github.com/graphql';
export const GITHUB_PROVIDER = 'github';


export const BITBUCKET_PROVIDER = 'bitbucket';



export const BASE_PATH = process.cwd();
export const BASE_PATH_PROVIDERS = './data/providers/';
export const BASE_PATH_IMAGENES = './data/imagenes/';
export const BASE_PATH_REPOSITORIES = './data/repositories/';
export const BASE_PATH_REPOSITORIES_METADATA = './data/repositories/metadata/';
export const BASE_PATH_WEBHOOKS = './data/webhooks/';
export const BASE_PATH_PROJECTS = './data/projects/';
export const BASE_PATH_SECRETS = './data/secrets/';
export const BASE_PATH_TRIGGERS = './data/triggers/';
export const BASE_PATH_DEPLOYERS = './data/deployers/';
export const BASE_PATH_BUILDS = './data/builds/';
export const BASE_PATH_BUILD_LOGS = './data/buildlogs/';
export const BASE_PATH_BUILD_QUEUE = './data/buildqueue/';
export const BASE_PATH_DEPLOYS = './data/deploys/';
export const BASE_PATH_DEPLOY_LOGS = './data/deployslogs/';
export const BASE_PATH_DEPLOY_QUEUE = './data/deploysqueue/';


export const providersPath = path.join(BASE_PATH, BASE_PATH_PROVIDERS);
export const imagenesPath = path.join(BASE_PATH, BASE_PATH_IMAGENES);
export const repositoriesPath = path.join(BASE_PATH, BASE_PATH_REPOSITORIES);
export const repositoriesMetadataPath = path.join(BASE_PATH, BASE_PATH_REPOSITORIES_METADATA);
export const webhooksPath = path.join(BASE_PATH, BASE_PATH_WEBHOOKS);
export const projectsPath = path.join(BASE_PATH, BASE_PATH_PROJECTS);
export const secretsPath = path.join(BASE_PATH, BASE_PATH_SECRETS);
export const triggersPath = path.join(BASE_PATH, BASE_PATH_TRIGGERS);
export const deployersPath = path.join(BASE_PATH, BASE_PATH_DEPLOYERS);
export const buildsPath = path.join(BASE_PATH, BASE_PATH_BUILDS);
export const buildLogsPath = path.join(BASE_PATH, BASE_PATH_BUILD_LOGS);
export const buildQueuePath = path.join(BASE_PATH, BASE_PATH_BUILD_QUEUE);
export const deploysPath = path.join(BASE_PATH, BASE_PATH_DEPLOYS);
export const deployLogsPath = path.join(BASE_PATH, BASE_PATH_DEPLOY_LOGS);
export const deployQueuePath = path.join(BASE_PATH, BASE_PATH_DEPLOY_QUEUE);



export const DOCKER_AUTH_USERNAME = process.env.DOCKER_AUTH_USERNAME || '';
export const DOCKER_AUTH_PASSWORD = process.env.DOCKER_AUTH_PASSWORD || '';
export const DOCKER_AUTH_SERVER_ADDRESS = process.env.DOCKER_AUTH_SERVER_ADDRESS || 'https://index.docker.io/v2/';
// #endregion module
