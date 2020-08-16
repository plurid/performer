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
    all: LOG_LEVEL_ALL,
    fatal: LOG_LEVEL_FATAL,
    error: LOG_LEVEL_ERROR,
    warn: LOG_LEVEL_WARN,
    info: LOG_LEVEL_INFO,
    debug: LOG_LEVEL_DEBUG,
    trace: LOG_LEVEL_TRACE,
};

export const logLevel = QUIET
    ? 0
    : parseInt(LOG_LEVEL);
