// #region imports
    // #region external
    import {
        DatabaseType,
        StorageType,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const DATABASE_TYPE = (process.env.HYPOD_DATABASE_TYPE as DatabaseType | undefined)
    || 'filesystem';

export const STORAGE_TYPE = (process.env.HYPOD_STORAGE_TYPE as StorageType | undefined)
    || 'filesystem';


export const LOG_LEVEL = process.env.PERFORMER_LOG_LEVEL || '7';
export const QUIET = process.env.PERFORMER_QUIET === 'true';


export const LOG_LEVEL_NONE = 7;
export const LOG_LEVEL_FATAL = 6;
export const LOG_LEVEL_ERROR = 5;
export const LOG_LEVEL_WARN = 4;
export const LOG_LEVEL_INFO = 3;
export const LOG_LEVEL_DEBUG = 2;
export const LOG_LEVEL_TRACE = 1;
export const LOG_LEVEL_ALL = 0;

export const logLevels = {
    none: LOG_LEVEL_NONE,
    fatal: LOG_LEVEL_FATAL,
    error: LOG_LEVEL_ERROR,
    warn: LOG_LEVEL_WARN,
    info: LOG_LEVEL_INFO,
    debug: LOG_LEVEL_DEBUG,
    trace: LOG_LEVEL_TRACE,
    all: LOG_LEVEL_ALL,
};

export const logLevel = QUIET
    ? 0
    : parseInt(LOG_LEVEL);



export const PRIVATE_USAGE = process.env.PERFORMER_PRIVATE_USAGE
    ? process.env.PERFORMER_PRIVATE_USAGE === 'true'
    : false;
export const PRIVATE_OWNER_IDENTONYM = process.env.PERFORMER_PRIVATE_OWNER_IDENTONYM || '';
export const PRIVATE_OWNER_KEY = process.env.PERFORMER_PRIVATE_OWNER_KEY || '';
export const PRIVATE_TOKEN = process.env.PERFORMER_PRIVATE_TOKEN || '';
// #endregion module
