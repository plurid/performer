// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        logLevels,
        USE_DELOG,
    } from '#server/data/constants';

    import {
        stringifyError,
    } from '#server/utilities';
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
        error?: any,
        extradata?: string,
    ) {
        if (USE_DELOG) {
            delog({
                text: data,
                level,
                error,
                extradata,
            });
            return;
        }

        if (this.level <= level) {
            console.log(data);

            if (error) {
                console.log(
                    stringifyError(error),
                );
            }

            if (extradata) {
                console.log(extradata);
            }
        }
    }
}
// #endregion module



// #region exports
export default Logger
// #endregion exports
