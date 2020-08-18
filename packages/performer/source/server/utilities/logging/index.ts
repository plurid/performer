// #region module
export const generateLog = (
    type: string,
    state: string,
    method: string,
    usage?: string,
) => {
    const usageString = usage
        ? ''
        : ` · ${usage}`;

    const log = `[Performer ${type} : ${state}] :: ${method}` + usageString;

    return log;
}
// #endregion module
