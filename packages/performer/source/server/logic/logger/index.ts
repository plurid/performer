// #region imports
    // #region external
    import {
        logLevels,
    } from '#server/data/constants';
    // #endregion external
// #endregion imports



// #region module
class Logger {
    private level: number;

    constructor(
        level: number,
    ) {
        this.level = level;
    }

    public log(
        data: string,
        level = logLevels.info,
    ) {
        if (this.level <= level) {
            console.log(data);
        }
    }
}
// #endregion module



// #region exports
export default Logger
// #endregion exports
