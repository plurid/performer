// #region module
export const generateLog = (
    type: string,
    state: string,
    method: string,
    usage?: string,
) => {
    const usageString = usage
        ? ` · ${usage}`
        : '';

    const log = `performer ${type} : ${state} :: ${method}` + usageString;

    return log;
}


export const generateMethodLogs = (
    method: string,
) => {
    return {
        infoStart: generateLog('info', 'start', method),
        infoSuccess: generateLog('info', 'success', method),
        infoEnd: generateLog('info', 'end', method),

        errorEnd: generateLog('error', 'end', method),

        infoHandlePrivateUsage: generateLog('info', 'handle', method, 'privateUsage'),
        infoEndPrivateUsage: generateLog('info', 'end', method, 'privateUsage'),
        infoSuccessPrivateUsage: generateLog('info', 'success', method, 'privateUsage'),

        infoHandleCustomLogicUsage: generateLog('info', 'handle', method, 'customLogicUsage'),
        infoEndCustomLogicUsage: generateLog('info', 'end', method, 'customLogicUsage'),
        infoSuccessCustomLogicUsage: generateLog('info', 'success', method, 'customLogicUsage'),
    };
}
// #endregion module
