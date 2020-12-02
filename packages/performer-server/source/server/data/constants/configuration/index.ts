// #region imports
    // #region external
    import {
        DatabaseType,
        StorageType,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const DATABASE_TYPE = (process.env.PERFORMER_DATABASE_TYPE as DatabaseType | undefined)
    || 'filesystem';

export const STORAGE_TYPE = (process.env.PERFORMER_STORAGE_TYPE as StorageType | undefined)
    || 'filesystem';


export const QUIET = process.env.PERFORMER_QUIET === 'true';
export const LOG_LEVEL = process.env.PERFORMER_LOG_LEVEL || '7';

export const logLevel = QUIET
    ? 0
    : parseInt(LOG_LEVEL);


export const CUSTOM_LOGIC_USAGE = process.env.PERFORMER_CUSTOM_LOGIC_USAGE === 'true';

export const PRIVATE_USAGE = process.env.PERFORMER_PRIVATE_USAGE === 'true'
export const PRIVATE_OWNER_IDENTONYM = process.env.PERFORMER_PRIVATE_OWNER_IDENTONYM || '';
export const PRIVATE_OWNER_KEY = process.env.PERFORMER_PRIVATE_OWNER_KEY || '';
export const PRIVATE_TOKEN = process.env.PERFORMER_PRIVATE_TOKEN || '';



export const DOCKER_AUTH_USERNAME = process.env.DOCKER_AUTH_USERNAME || '';
export const DOCKER_AUTH_PASSWORD = process.env.DOCKER_AUTH_PASSWORD || '';
export const DOCKER_AUTH_SERVER_ADDRESS = process.env.DOCKER_AUTH_SERVER_ADDRESS || 'https://index.docker.io/v2/';



export const IN_CONTAINER_USAGE = process.env.PERFORMER_IN_CONTAINER_USAGE === 'true';
export const IN_CONTAINER_HOST_BIND = process.env.PERFORMER_IN_CONTAINER_HOST_BIND || '';



export const USE_DELOG = process.env.USE_DELOG === 'true';
// #endregion module
