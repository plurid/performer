// #region imports
    // #region external
    import {
        Context,
        InputValueString,
    } from '#server/data/interfaces';

    import {
        deregisterImagene,
    } from '#server/logic/imagene';

    import {
        generateMethodLogs,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const obliterateImageneLogs = generateMethodLogs('obliterateImagene');

const obliterateImagene = async (
    input: InputValueString,
    context: Context,
) => {
    const {
        value
    } = input;

    await deregisterImagene(value);

    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default obliterateImagene;
// #endregion exports
