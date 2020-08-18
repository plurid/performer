// #region module
export interface Logger {
    log: (
        data: string,
        level?: number,
    ) => void;
}

export interface LogLevels {
    none: number;
    fatal: number;
    error: number;
    warn: number;
    info: number;
    debug: number;
    trace: number;
    all: number;
};
// #endregion module
